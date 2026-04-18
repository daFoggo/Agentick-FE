import { createFileRoute } from "@tanstack/react-router"
import { AllTasksPage } from "@/features/users"

export const Route = createFileRoute("/dashboard/$teamId/profile/tasks")({
  component: AllTasksPage,
  staticData: {
    getTitle: () => "Tasks",
  },
})
