import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  resolveViewModes,
  useViewModeListHydrated,
  useViewModeListStore,
} from "@/stores/use-view-mode-list-store"
import type { IViewModeCatalogItem } from "@/types/view-mode-list"
import { Link, useLocation } from "@tanstack/react-router"
import { SlidersHorizontal } from "lucide-react"
import { type ReactNode, useEffect } from "react"
import { ViewModeListSkeleton } from "./skeleton"

interface IViewModeListProps {
  catalog: IViewModeCatalogItem[]
  scope: string
  params?: Record<string, string>
  badgeMap?: Partial<Record<string, ReactNode>>
  hide?: boolean
  allowCustomization?: boolean
}

export const ViewModeList = ({
  catalog,
  scope,
  params,
  badgeMap,
  hide,
  allowCustomization,
}: IViewModeListProps) => {
  const { pathname } = useLocation()
  const viewModeScope = scope
  const allowViewModeCustomization = allowCustomization ?? true
  const hasHydrated = useViewModeListHydrated()

  const scopeState = useViewModeListStore(
    (state) => state.modesByScope[viewModeScope]
  )
  const setActiveMode = useViewModeListStore((state) => state.setActiveMode)
  const updateMode = useViewModeListStore((state) => state.updateMode)
  const toggleModeVisibility = useViewModeListStore(
    (state) => state.toggleModeVisibility
  )

  const navDefinitions = catalog.map((mode) => ({
    ...mode,
    badge: badgeMap?.[mode.value] ?? mode.badge,
    render: () => null,
  }))
  
  const toByValue = Object.fromEntries(
    catalog.map((mode) => [mode.value, mode.to])
  ) as Record<string, string | undefined>

  const activeMode = pathname.replace(/\/+$/, "").split("/").at(-1)
  const shouldHide = hide || navDefinitions.length === 0

  const { modes } = resolveViewModes(navDefinitions, scopeState)

  const visibleModes = modes.filter((mode) => mode.isVisible)
  const displayModes = modes.filter(
    (mode) => mode.isVisible || mode.value === activeMode
  )

  useEffect(() => {
    if (!activeMode) return

    const active = modes.find((mode) => mode.value === activeMode)
    if (active && !active.isVisible) {
      updateMode(
        viewModeScope,
        activeMode,
        { isVisible: true },
        navDefinitions
      )
    }
  }, [activeMode, modes, navDefinitions, updateMode, viewModeScope])

  if (shouldHide) {
    return null
  }

  if (!hasHydrated) {
    return <ViewModeListSkeleton />
  }

  if (displayModes.length === 0) {
    return null
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="inline-flex w-fit items-center rounded-lg bg-muted p-0.75 text-muted-foreground">
        {displayModes.map((mode) => {
          const to = toByValue[mode.value]
          if (!to) return null

          return (
            <Link
              key={mode.value}
              to={to as any}
              params={params as any}
              onClick={() => setActiveMode(viewModeScope, mode.value)}
            >
              {({ isActive }) => (
                <span
                  className={[
                    "inline-flex h-[calc(100%-1px)] items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors",
                    isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-foreground/60 hover:text-foreground",
                  ].join(" ")}
                >
                  <mode.icon className="size-4" />
                  {mode.label}
                  {mode.badge ? (
                    <span className="text-xs text-muted-foreground">
                      {mode.badge}
                    </span>
                  ) : null}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {allowViewModeCustomization ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal />
              Customize
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuGroup>
              <DropdownMenuLabel>View Modes</DropdownMenuLabel>
              {modes.map((mode) => {
                const disabled = mode.isVisible && visibleModes.length === 1

                return (
                  <DropdownMenuCheckboxItem
                    key={`mode-setting-${mode.value}`}
                    checked={mode.isVisible}
                    disabled={disabled}
                    onCheckedChange={() => {
                      toggleModeVisibility(
                        viewModeScope,
                        mode.value,
                        navDefinitions
                      )
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <mode.icon />
                      {mode.label}
                    </span>
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </div>
  )
}
