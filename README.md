# Agentick - AI-Powered Project Management

Agentick is a modern project management platform that proactively detects deadline risks and improves estimation accuracy using AI agents and execution behavior data.

## 🚀 Welcome to the Development Team!

This guide is for developers joining the project to ensure consistency, quality, and smooth collaboration.

---

## 🏗️ 1. Introduction

Agentick is an AI Agent-powered project management platform that proactively detects deadline risks and improves deadline estimation over time using accumulated execution behavior data.

The platform leverages advanced AI agents to analyze historical execution patterns, providing teams with predictive insights that traditional project management tools lack.

## ⚙️ 2. Installation

This project uses `pnpm` as the package manager. Ensure you have it installed globally.

### Prerequisites
- Node.js (Latest LTS recommended)
- pnpm (`npm install -g pnpm`)

### Setup Steps
1. Clone the repository.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```

## 📁 3. Project Structure

The project follows a **Feature-Based Architecture**. This approach keeps domestic logic encapsulated and makes the codebase easier to navigate as it scales.

```text
src/
├── components/          # Global UI components (Shadcn, Base UI)
├── configs/             # Global configurations (API, Auth)
├── constants/           # Shared constants (Enums, static data)
├── features/            # Business logic divided by feature (Core)
│   ├── auth/            # Authentication feature
│   ├── projects/        # Project management feature
│   │   ├── components/  # Feature-specific UI
│   │   ├── functions.ts # API calls / helper logic
│   │   ├── queries.ts   # TanStack Query hooks
│   │   ├── schemas.ts   # Zod validation schemas
│   │   ├── index.ts     # Public API (Export point)
│   │   └── server.ts    # Server-side logic (TanStack Start)
│   └── ...
├── hooks/               # Global React hooks
├── lib/                 # Third-party library initializations (Axios, etc.)
├── routes/              # TanStack Router route definitions
├── stores/              # Global state management (Zustand)
└── types/               # Global TypeScript definitions
```

## 🛠️ 4. Development Patterns

### Scoping: Global vs. Feature

Maintaining a clean separation between global and feature-specific code is crucial for maintainability.

| Scope | When to use? | Real Examples |
| :--- | :--- | :--- |
| **Feature** | Code that belongs to a specific business domain (Auth, Project, Team). | `ProjectSettings`, `authSchema`, `useTeamsQuery` |
| **Common / Global** | Reusable logic used across 2+ features or core system entities. | `RoleBadge`, `DataTable`, `MarkdownRenderer` |
| **Layout** | Core structural components shared across the entire application shell. | `ViewModeList`, `Sidebar`, `AppHeader` |

#### Comparison Example:
- **Feature Component**: `src/features/projects/components/project-settings.tsx` - This component is tightly coupled with the Project entity and its update logic.
- **Common Component**: `src/components/common/role-badge.tsx` - While it handles user roles, it is used across Teams, Projects, and User profiles, making it a "Common" utility.
- **Layout Component**: `src/components/layout/app/view-mode-list/` - This is a structural part of the dashboard that affects how all project-related data is displayed.

### Creating a New Feature

When building a new feature (e.g., "Teams"), follow this standard structure:

1. **Initialize Directory**: Create `src/features/teams/`.
2. **Define Schema** (`schemas.ts`): Use Zod to define data models and form validation.
   - *Example*: `teamSchema` for creating/updating teams.
3. **API Logic** (`functions.ts`): Define API interaction functions.
4. **Hooks** (`queries.ts`): Create TanStack Query hooks for caching and state management.
   - *Example*: `useTeamsQuery`, `useUpdateTeamMutation`.
5. **UI Components** (`components/`): Build feature-specific views.
   - *Example*: `TeamSettings`, `CreateTeamDialog`.
6. **Server Actions** (`server.ts`): Define server-side functions (TanStack Start specific).
7. **Export** (`index.ts`): Use a barrel file to export the public API of the feature.

#### Export/Import Pattern
To keep the internal structure of a feature private, always use the `index.ts` file as the entry point.

**Wrong (Direct access):**
```typescript
import { teamSchema } from "@/features/teams/schemas";
```

**Correct (Via Barrel File):**
```typescript
import { teamSchema } from "@/features/teams";
```

## 📚 5. Recommended Documentation

To effectively contribute to the project, familiarize yourself with our core tech stack:

- [TanStack Start](https://tanstack.com/start) - Full-stack framework
- [TanStack Router](https://tanstack.com/router) - Type-safe routing
- [TanStack Query](https://tanstack.com/query) - State & Data fetching
- [TanStack Form](https://tanstack.com/form) - Type-safe form management
- [TanStack Table](https://tanstack.com/table) - Headless table logic
- [Zod](https://zod.dev) - Schema validation
- [Shadcn UI](https://ui.shadcn.com) - UI component system
