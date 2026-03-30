# Data Fetching & CRUD Strategy in TanStack Start

A practical guide to handling server functions, caching, and mutations — the right way.

---

## Overview

When building real-world apps with TanStack Start, you have three layers to think about:

```
Server Functions  →  transport layer   (call/return, no state)
TanStack Query    →  cache layer       (holds data, tracks staleness)
Router Loader     →  seed layer        (populates cache before render)
```

These three layers have clearly separated responsibilities. When each does only its job — and nothing else — your data flow becomes predictable, your UI stays consistent, and cache bugs stop haunting you weeks after shipping.

---

## Quick Decision Guide

Before reaching for any tool, ask:

```
Does this data need to be reactive after render?
│
├─ No  → Loader only + useLoaderData()
│        Best for: config pages, static content, one-time display
│
└─ Yes → TanStack Query
         │
         ├─ Read  → queryOptions + ensureQueryData in loader
         │          + useSuspenseQuery in component
         │
         └─ Write → useMutation with serverFn as mutationFn
                    + invalidateQueries or setQueryData after success
```

---

## The Three Options — When Each Fits

### Option 1: Router Loader Only

The router's built-in cache supports deduplication, preloading, and stale-while-revalidate per route. For many small-to-medium apps, this is genuinely enough.

```tsx
export const Route = createFileRoute('/tasks')({
  loader: () => getTasksFn({ data: { projectId: '123' } }),
  staleTime: 30_000,
  component: TasksPage,
})

function TasksPage() {
  const tasks = Route.useLoaderData()
  // Done. No extra setup needed.
}
```

**Use when:**
- Data is only needed fresh on route entry
- No need to share cache between different routes
- Mutations are simple — `router.invalidate()` after a write is sufficient
- No background refetch intervals or complex invalidation logic

**Limitation:** The router cache is scoped per route. It cannot share state across routes — if you update a task on `/tasks/$taskId`, the `/tasks` list won't know about it without a full invalidation.

---

### Option 2: TanStack Query

TanStack Query acts as an application-level cache. This is the tool you reach for when data crosses route boundaries, when mutations need precise invalidation, or when you need features like optimistic updates, infinite scroll, or refetch intervals.

**Use when:**

| Situation | Why Query |
|---|---|
| Multiple routes share the same data | Router cache is per-route; Query cache is global |
| Mutation in one route must update another | `invalidateQueries` targets specific keys |
| Optimistic updates needed | Built-in `onMutate` / rollback pattern |
| Background refetching on interval | `refetchInterval` option |
| Infinite scroll or pagination | `useInfiniteQuery` |
| Client-side filters drive re-fetching | Dynamic `queryKey` triggers re-fetch automatically |

---

### Option 3: Plain Fetch

For truly one-shot data — content that is rendered once, never mutated, never shared — a plain `fetch` in a loader is perfectly valid.

```tsx
export const Route = createFileRoute('/about')({
  loader: async () => {
    const res = await fetch('/api/site-config')
    return res.json()
  },
  component: AboutPage,
})
```

**Use when:**
- Data is static (config, metadata, legal content)
- No invalidation, no refetch, no tracking needed
- Render it once and move on

---

## Feature Structure

Organize each domain feature with a clear separation of concerns:

```
features/
└── tasks/
    ├── types.ts       ← TypeScript types
    ├── schemas.ts     ← Zod input validation schemas
    ├── server.ts      ← Raw HTTP calls (server-only)
    ├── functions.ts   ← createServerFn wrappers (isomorphic)
    └── queries.ts     ← queryOptions, key factory, mutation hooks
```

---

## Building Each Layer

### types.ts

```ts
export type Task = {
  id: string
  title: string
  status: 'todo' | 'in_progress' | 'done'
  projectId: string
  assigneeId: string | null
  createdAt: string
}

export type PaginatedTasks = {
  items: Task[]
  total: number
  page: number
  limit: number
}
```

---

### schemas.ts

```ts
import { z } from 'zod'

export const TaskStatusSchema = z.enum(['todo', 'in_progress', 'done'])

export const GetTasksSchema = z.object({
  projectId: z.string().uuid().optional(),
  status: TaskStatusSchema.optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
})

export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  status: TaskStatusSchema.default('todo'),
  projectId: z.string().uuid(),
  assigneeId: z.string().uuid().nullable().optional(),
})

export const UpdateTaskSchema = CreateTaskSchema.partial().extend({
  id: z.string().uuid(),
})

export const TaskIdSchema = z.object({
  id: z.string().uuid(),
})

export type GetTasksInput = z.infer<typeof GetTasksSchema>
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>
```

---

### server.ts

Import `@tanstack/react-start/server-only` at the top to guarantee this module never ships to the client bundle.

```ts
import '@tanstack/react-start/server-only'
import { apiRequest } from '~/lib/api-client.server'
import type { Task, PaginatedTasks } from './types'
import type { GetTasksInput, CreateTaskInput } from './schemas'

async function getToken() {
  const { getSession } = await import('~/lib/session.server')
  return (await getSession()).token
}

export async function fetchTasks(params: GetTasksInput): Promise<PaginatedTasks> {
  const token = await getToken()
  const q = new URLSearchParams()
  if (params.projectId) q.set('project_id', params.projectId)
  if (params.status) q.set('status', params.status)
  q.set('page', String(params.page))
  q.set('limit', String(params.limit))
  return apiRequest<PaginatedTasks>(`/tasks?${q}`, { token })
}

export async function fetchTaskById(id: string): Promise<Task> {
  const token = await getToken()
  return apiRequest<Task>(`/tasks/${id}`, { token })
}

export async function createTaskRequest(payload: CreateTaskInput): Promise<Task> {
  const token = await getToken()
  return apiRequest<Task>('/tasks', { method: 'POST', body: payload, token })
}

export async function updateTaskRequest(
  id: string,
  payload: Partial<CreateTaskInput>
): Promise<Task> {
  const token = await getToken()
  return apiRequest<Task>(`/tasks/${id}`, { method: 'PATCH', body: payload, token })
}

export async function deleteTaskRequest(id: string): Promise<void> {
  const token = await getToken()
  return apiRequest<void>(`/tasks/${id}`, { method: 'DELETE', token })
}
```

---

### functions.ts

`createServerFn` is the isomorphic bridge. When called inside a loader (server context), TanStack Start executes the handler directly — no network round-trip. When called on the client, it automatically becomes an RPC call.

> **Important:** `useServerFn` is a React hook and can only be called inside components. Do not use it inside `queryOptions` — those run in both loader and component contexts. Call the server function directly instead.

```ts
import { createServerFn } from '@tanstack/react-start'
import { notFound, redirect } from '@tanstack/react-router'
import {
  GetTasksSchema,
  TaskIdSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
} from './schemas'
import {
  fetchTasks,
  fetchTaskById,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from './server'

export const getTasksFn = createServerFn({ method: 'GET' })
  .inputValidator(GetTasksSchema)
  .handler(({ data }) => fetchTasks(data))

export const getTaskByIdFn = createServerFn({ method: 'GET' })
  .inputValidator(TaskIdSchema)
  .handler(async ({ data }) => {
    try {
      return await fetchTaskById(data.id)
    } catch (e) {
      if (e instanceof Error && e.message.includes('404')) throw notFound()
      throw e
    }
  })

export const createTaskFn = createServerFn({ method: 'POST' })
  .inputValidator(CreateTaskSchema)
  .handler(({ data }) => createTaskRequest(data))

export const updateTaskFn = createServerFn({ method: 'POST' })
  .inputValidator(UpdateTaskSchema)
  .handler(({ data }) => {
    const { id, ...payload } = data
    return updateTaskRequest(id, payload)
  })

export const deleteTaskFn = createServerFn({ method: 'POST' })
  .inputValidator(TaskIdSchema)
  .handler(async ({ data }) => {
    await deleteTaskRequest(data.id)
    throw redirect({ to: '/tasks' })
  })
```

---

### queries.ts

This file is the heart of data management. Define your query key factory, `queryOptions`, and mutation hooks here. Export everything — components only import, they never manage cache internals directly.

#### Query Key Factory

Cache key management left to individual developers leads to typos, mismatches, and stale UI bugs that are difficult to trace. A centralized key factory with a clear hierarchy fixes this.

```ts
export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (params: GetTasksInput) => [...taskKeys.lists(), params] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
}
```

TanStack Query's partial key matching means `taskKeys.all` invalidates every query whose key starts with `['tasks']` — lists, details, filters — all at once, without having to enumerate them individually.

#### queryOptions

Define the `queryKey` and `queryFn` once. Reuse across `useQuery`, `useSuspenseQuery`, `prefetchQuery`, `ensureQueryData`, and `setQueryData` — all fully type-safe.

```ts
import { queryOptions } from '@tanstack/react-query'
import { getTasksFn, getTaskByIdFn } from './functions'
import type { GetTasksInput } from './schemas'

export const tasksQueryOptions = (params: GetTasksInput) =>
  queryOptions({
    queryKey: taskKeys.list(params),
    // Call server function directly — server executes inline, client does RPC
    queryFn: () => getTasksFn({ data: params }),
    staleTime: 30_000, // 30 seconds
  })

export const taskQueryOptions = (id: string) =>
  queryOptions({
    queryKey: taskKeys.detail(id),
    queryFn: () => getTaskByIdFn({ data: { id } }),
    staleTime: 60_000, // 1 minute
  })
```

#### Mutation Hooks

Co-locate mutation hooks with your queries. Components import a hook and call `.mutate()` — they never touch `queryClient` directly.

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTaskFn, updateTaskFn, deleteTaskFn } from './functions'
import type { CreateTaskInput, UpdateTaskInput } from './schemas'

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateTaskInput) => createTaskFn({ data: input }),
    onSuccess: () => {
      // Position in list is server's decision — always refetch
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: UpdateTaskInput) => updateTaskFn({ data: input }),
    onSuccess: (updatedTask) => {
      // Write server response directly to detail cache — no extra request
      queryClient.setQueryData(taskQueryOptions(updatedTask.id).queryKey, updatedTask)
      // List may reorder or refilter — invalidate
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
    },
  })
}

export const useDeleteTask = (listParams: GetTasksInput) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTaskFn({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
    },
  })
}
```

---

## Routes

### List Route — `routes/tasks/index.tsx`

The recommended pattern: use `ensureQueryData` in the loader to populate the cache before render. Use `useSuspenseQuery` in the component with the same `queryOptions`. The data is already in cache — no loading flash, no duplicate fetch.

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  tasksQueryOptions,
  useCreateTask,
  useDeleteTask,
} from '~/features/tasks/queries'

const DEFAULT_PARAMS = { page: 1, limit: 20 }

export const Route = createFileRoute('/tasks/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(tasksQueryOptions(DEFAULT_PARAMS)),
  component: TasksPage,
})

function TasksPage() {
  const { data } = useSuspenseQuery(tasksQueryOptions(DEFAULT_PARAMS))
  const createTask = useCreateTask()
  const deleteTask = useDeleteTask(DEFAULT_PARAMS)

  return (
    <div>
      <h1>Tasks ({data.total})</h1>

      <button
        onClick={() =>
          createTask.mutate({
            title: 'New Task',
            projectId: '...',
            status: 'todo',
          })
        }
        disabled={createTask.isPending}
      >
        {createTask.isPending ? 'Creating...' : 'New Task'}
      </button>

      {data.items.map((task) => (
        <div key={task.id}>
          <span>{task.title} — {task.status}</span>
          <button
            onClick={() => deleteTask.mutate(task.id)}
            disabled={deleteTask.isPending}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}
```

> **Do not mix `useLoaderData` and `useSuspenseQuery` for the same data.** If you're using TanStack Query, seed the cache in the loader and read from the cache in the component. Two sources of truth for the same data cause subtle inconsistencies.

---

### Detail Route — `routes/tasks/$taskId.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { taskQueryOptions, useUpdateTask } from '~/features/tasks/queries'
import { useState } from 'react'

export const Route = createFileRoute('/tasks/$taskId')({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(taskQueryOptions(params.taskId)),
  notFoundComponent: () => <div>Task not found.</div>,
  component: TaskDetailPage,
})

function TaskDetailPage() {
  const { taskId } = Route.useParams()
  const { data: task } = useSuspenseQuery(taskQueryOptions(taskId))
  const updateTask = useUpdateTask()
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)

  return (
    <div>
      {editing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <button
            onClick={() =>
              updateTask.mutate(
                { id: taskId, title },
                { onSuccess: () => setEditing(false) }
              )
            }
            disabled={updateTask.isPending}
          >
            {updateTask.isPending ? 'Saving...' : 'Save'}
          </button>
          <button onClick={() => setEditing(false)}>Cancel</button>
          {updateTask.isError && <p>{updateTask.error.message}</p>}
        </>
      ) : (
        <>
          <h1>{task.title}</h1>
          <p>{task.status}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
    </div>
  )
}
```

---

## Mutation Strategies

Choose the right level of complexity for the UX you need.

### Level 1 — Invalidate (handles 80% of cases)

Simple, predictable. Server is the source of truth — let it refetch.

```ts
const mutation = useMutation({
  mutationFn: (input) => createTaskFn({ data: input }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
  },
})
```

---

### Level 2 — setQueryData (avoid a round-trip when server returns fresh data)

When the mutation response already contains the updated record, write it straight to cache.

```ts
const mutation = useMutation({
  mutationFn: (input) => updateTaskFn({ data: input }),
  onSuccess: (updatedTask) => {
    // Detail cache: write directly, no refetch needed
    queryClient.setQueryData(taskQueryOptions(updatedTask.id).queryKey, updatedTask)
    // List cache: still invalidate — order/filters may have changed
    queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
  },
})
```

---

### Level 3 — Optimistic Update (best UX, highest complexity)

Update the UI instantly, roll back on error, then sync with server on settle.

```ts
const mutation = useMutation({
  mutationFn: (id: string) => deleteTaskFn({ data: { id } }),

  onMutate: async (id) => {
    // Cancel outgoing refetches — prevent them from overwriting optimistic state
    await queryClient.cancelQueries({ queryKey: taskKeys.lists() })

    // Snapshot current state for rollback
    const previousTasks = queryClient.getQueryData(taskKeys.list(params))

    // Apply optimistic update immediately
    queryClient.setQueryData(taskKeys.list(params), (old: Task[] | undefined) =>
      old?.filter((t) => t.id !== id)
    )

    return { previousTasks }
  },

  onError: (_err, _id, context) => {
    // Restore previous state
    queryClient.setQueryData(taskKeys.list(params), context?.previousTasks)
  },

  onSettled: () => {
    // Always re-sync with server — success or failure
    queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
  },
})
```

---

## invalidate vs setQueryData — Which to Use

| Scenario | Use |
|---|---|
| DELETE — remove item from list | `invalidateQueries` — let server confirm |
| UPDATE — server returns updated item | `setQueryData` on detail + `invalidateQueries` on lists |
| CREATE — server returns new item | `invalidateQueries` on lists — position is server's decision |
| Need instant feedback (no loading) | Optimistic: `setQueryData` in `onMutate` + `invalidateQueries` in `onSettled` |

---

## Loader: prefetchQuery vs ensureQueryData

| | `ensureQueryData` | `prefetchQuery` |
|---|---|---|
| Behavior | Uses cache if fresh, fetches if stale | Always kicks off a fetch |
| Blocks render? | Yes (when awaited) | No |
| Best for | Most loaders — critical data | Secondary data, streaming |

```ts
loader: async ({ context }) => {
  // Critical — block render until ready
  await context.queryClient.ensureQueryData(tasksQueryOptions(params))

  // Secondary — kick off but don't block (streams in)
  context.queryClient.prefetchQuery(commentsQueryOptions(params))
}
```

---

## Summary

```
serverFn        →  transport only. Runs inline on server, RPC on client.
queryOptions    →  define queryKey + queryFn once, reuse everywhere.
loader          →  seed the cache with ensureQueryData before render.
useSuspenseQuery →  read from cache in component, never loading flash.
useMutation     →  call serverFn, then invalidate or setQueryData.
```

Each layer does exactly one job. None of them reach into each other's responsibilities. This is the architecture that scales.

---

## File Reference

```
features/
└── tasks/
    ├── types.ts        TypeScript interfaces
    ├── schemas.ts      Zod schemas + inferred input types
    ├── server.ts       Raw API calls — server-only, never ships to client
    ├── functions.ts    createServerFn — isomorphic transport layer
    └── queries.ts      Key factory, queryOptions, mutation hooks

routes/
└── tasks/
    ├── index.tsx       ensureQueryData in loader + useSuspenseQuery + mutation hooks
    └── $taskId.tsx     ensureQueryData in loader + useSuspenseQuery + useUpdateTask
```