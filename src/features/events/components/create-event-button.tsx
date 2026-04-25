import { Button } from "@/components/ui/button"
import { CalendarPlus } from "lucide-react"

export const CreateEventButton = () => {
  return (
    <div className="p-2">
      <Button className="w-full">
        <CalendarPlus className="size-4" />
        Create new event
      </Button>
    </div>
  )
}
