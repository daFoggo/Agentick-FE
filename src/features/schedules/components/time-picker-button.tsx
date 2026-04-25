import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { InputGroupButton } from "@/components/ui/input-group"

interface TimePickerButtonProps {
  value: string
  onChange: (val: string) => void
}

export const TimePickerButton = ({
  value,
  onChange,
}: TimePickerButtonProps) => {
  const [open, setOpen] = useState(false)
  const [hours, minutes] = value.split(":")

  const hourOptions = Array.from({ length: 24 }).map((_, i) =>
    i.toString().padStart(2, "0")
  )
  const minuteOptions = ["00", "15", "30", "45"]

  const handleSelectHour = (h: string) => {
    onChange(`${h}:${minutes}`)
  }

  const handleSelectMinute = (m: string) => {
    onChange(`${hours}:${m}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <InputGroupButton
          variant="ghost"
          size="xs"
          className="h-7 px-2 text-sm font-medium hover:bg-accent/50"
        >
          {value}
        </InputGroupButton>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="flex h-64">
          <div className="flex-1 overflow-y-auto border-r p-1">
            {hourOptions.map((h) => (
              <Button
                key={h}
                variant={hours === h ? "secondary" : "ghost"}
                className="h-8 w-full justify-start px-2 text-xs"
                onClick={() => handleSelectHour(h)}
              >
                {h}
              </Button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto p-1">
            {minuteOptions.map((m) => (
              <Button
                key={m}
                variant={minutes === m ? "secondary" : "ghost"}
                className="h-8 w-full justify-start px-2 text-xs"
                onClick={() => handleSelectMinute(m)}
              >
                {m}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
