# Implementation Plan: Fix View Mode & Data Architecture Issues

## Problem Analysis

1. **Data Loss on Save**: When Ctrl+S triggers hot reload, page header data ("Unknown project", no members) disappears
   - Root cause: Static data from constants instead of API-driven data
   - SAMPLE_PROJECTS is hardcoded, not fetched

2. **No API Integration**: Currently all data is static
   - Header needs: Project details, members list
   - View modes need: Dynamic counts (active inbox items, bookmarks count, etc.)
   - Need proper separation: Zustand for UI state, TanStack Query for data

3. **Customization Control**: No way to disable view mode customization per route
   - Example: Inbox might not need customize button in some cases

4. **Architecture Gap**: No proper route loaders or async data patterns
   - No TanStack Query setup
   - No route-level data fetching

---

## Solution Architecture

### Phase 1: Setup TanStack Query & Data Fetching Foundation
1. **Install & Setup TanStack Query**
   - Add @tanstack/react-query package
   - Create QueryClientProvider wrapper
   - Setup query configuration and defaults

2. **Create Mock API Layer** (src/api/)
   - Fetch functions for projects, members, inbox data
   - Return realistic data with delays to simulate network
   - Create query hooks for each data type

3. **Setup Route Loaders**
   - Create loader functions in route files
   - Use TanStack Query hooks in loaders
   - Pass data via route context

### Phase 2: Fix Data Flow in Routes

1. **Projects Route ($projectId)**
   - Create loader to fetch project data via TanStack Query
   - Update ProjectHeader to use query data instead of SAMPLE_PROJECTS
   - Ensure data persists across hot reloads

2. **Inbox Route**
   - Create loader to fetch inbox stats (active count, bookmarks count, archive count)
   - Update header to show dynamic stats if needed

### Phase 3: Extend View Mode System for Metadata

1. **Add Badge/Count Support to View Modes**
   - Extend interfaces: `IViewModeDefinition`, `IViewModeState`, `IResolvedViewMode`
   - Add optional fields: `badge`, `badgeVariant`, `onBadgeClick`
   - Support both static and dynamic badges

2. **Persist View Mode Metadata**
   - Store metadata in Zustand state
   - Allow updates from query data

3. **Update ViewModeList Component**
   - Render badges in TabsTrigger
   - Handle badge click events
   - Show counts from TanStack Query data

### Phase 4: Add Customization Control

1. **Extend staticData interface**
   - Add `allowViewModeCustomization` (already exists, just use it)
   - Add `viewModeScope` defaults per route

2. **Update routes**
   - Inbox: Set `allowViewModeCustomization: false` if desired
   - Projects: Keep customization enabled

---

## File Changes Summary

### New Files
- `src/api/projects.ts` - Project queries
- `src/api/inbox.ts` - Inbox queries
- `src/hooks/useProjectData.ts` - Custom hook for projects
- `src/hooks/useInboxStats.ts` - Custom hook for inbox stats

### Modified Files
1. **src/router.tsx** - Add QueryClientProvider
2. **src/stores/use-view-mode-list-store.ts** - Add metadata support
3. **src/components/layout/app/view-mode-list/index.tsx** - Render badges
4. **src/routes/dashboard/projects/$projectId.tsx** - Add loader, use query data
5. **src/routes/dashboard/inbox/index.tsx** - Add loader, pass stats to view modes
6. **src/constants/view-mode-list.tsx** - Optionally add badge definitions

### Separation of Concerns
- **Zustand**: UI state only (view mode selection, visibility, reordering)
- **TanStack Query**: Data fetching, caching, sync state (projects, members, inbox items)
- **Route Loaders**: Ensure data ready before component renders
- **Component Props**: Pass query data explicitly to components

---

## Implementation Order

1. ✅ Setup TanStack Query in app root
2. ✅ Create API layer with mock endpoints
3. ✅ Create custom data hooks
4. ✅ Update store to support metadata
5. ✅ Extend view mode types for badges
6. ✅ Update ViewModeList component to render badges
7. ✅ Add route loaders to projects/$projectId
8. ✅ Add route loaders to inbox
9. ✅ Test data persistence across reloads
10. ✅ Add customization control per route

---

## Benefits

- ✅ Data persists across hot reloads (API source of truth)
- ✅ Dynamic badges with counts from API
- ✅ Proper UI/Data state separation
- ✅ Route-level data readiness guarantees
- ✅ Per-route customization control
- ✅ Extensible metadata system for future requirements
