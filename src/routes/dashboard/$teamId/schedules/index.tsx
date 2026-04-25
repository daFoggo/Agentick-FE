import { Calendar } from "@/components/ui/calendar"
import { CreateEventButton, EventTypeFilter } from "@/features/events"
import { mySchedulesQueryOptions, WorkTimePattern } from "@/features/schedules"
import { userQueries } from "@/features/users"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/$teamId/schedules/")({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(mySchedulesQueryOptions()),
      context.queryClient.ensureQueryData(userQueries.me()),
    ])
  },
  component: RouteComponent,
  staticData: {
    getTitle: () => "Schedules",
  },
})

function RouteComponent() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden p-0">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm md:flex-row">
        {/* Left Side: Work Time Patterns (Card Background) */}
        <div className="flex h-full w-full flex-col gap-4 overflow-hidden border-r bg-card p-2 md:w-72 md:shrink-0">
          <CreateEventButton />
          <div className="flex justify-center">
            <Calendar
              mode="single"
              className="w-full bg-card"
              captionLayout="dropdown"
            />
          </div>
          <WorkTimePattern />
          <EventTypeFilter />
        </div>

        {/* Right Side: Main Schedule View (Tailwind Background) */}
        <div className="flex h-full flex-1 flex-col overflow-hidden bg-background">
          <div className="flex h-full flex-col items-center justify-center space-y-4 p-8 text-center">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Calendar View</h3>
              <p className="max-w-sm text-muted-foreground">
                This area will display your specific events and tasks in a
                calendar format. Configure your recurring work hours on the left
                to get started.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
