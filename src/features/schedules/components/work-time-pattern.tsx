import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { userQueries } from "@/features/users"
import { useParams } from "@tanstack/react-router"

import {
  InputGroup,
  InputGroupButton,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/radix-switch"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { mySchedulesQueryOptions, useScheduleMutations } from "../queries"

const DAYS_OF_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export const WorkTimePattern = () => {
  const { teamId } = useParams({ from: "/dashboard/$teamId/schedules/" })
  const { data: user } = useQuery(userQueries.me())
  const { data: schedules, isLoading } = useQuery(mySchedulesQueryOptions())
  const { upsert } = useScheduleMutations()

  const userId = user?.id

  if (isLoading || !userId) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="w-32" />
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  // Ensure we have 7 days, mapping from Sunday (0) to Saturday (6)
  const days = Array.from({ length: 7 }).map((_, index) => {
    const existing = schedules?.find((s) => s.day_of_week === index)
    return {
      day_of_week: index,
      start_time: existing?.start_time ?? "09:00",
      end_time: existing?.end_time ?? "18:00",
      is_off: existing?.is_off ?? true,
      team_id: teamId,
      user_id: userId,
    }
  })

  const handleToggleOff = async (dayIndex: number, currentIsOff: boolean) => {
    const day = days[dayIndex]
    try {
      await upsert.mutateAsync({
        day_of_week: dayIndex,
        start_time: day.start_time,
        end_time: day.end_time,
        is_off: !currentIsOff,
        team_id: teamId,
        user_id: userId,
      })
    } catch (error) {
      toast.error("Failed to update schedule")
    }
  }

  const handleTimeChange = async (
    dayIndex: number,
    type: "start" | "end",
    value: string
  ) => {
    const day = days[dayIndex]
    try {
      await upsert.mutateAsync({
        day_of_week: dayIndex,
        start_time: type === "start" ? value : day.start_time,
        end_time: type === "end" ? value : day.end_time,
        is_off: day.is_off,
        team_id: teamId,
        user_id: userId,
      })
    } catch (error) {
      toast.error("Failed to update time")
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <FieldGroup className="gap-2">
          {days.map((day, index) => (
            <Field
              key={index}
              orientation="horizontal"
              className={cn(
                "justify-between rounded-lg border border-transparent px-2 py-1 transition-colors hover:bg-accent/30",
                day.is_off && "opacity-60"
              )}
            >
              <div className="flex items-center gap-3">
                <Switch
                  id={`day-${index}`}
                  checked={!day.is_off}
                  onCheckedChange={() => handleToggleOff(index, !!day.is_off)}
                />
                <label
                  htmlFor={`day-${index}`}
                  className="w-24 cursor-pointer text-sm font-semibold select-none"
                >
                  {DAYS_OF_WEEK[index]}
                </label>
              </div>

              <div className="flex w-[140px] items-center justify-end">
                {!day.is_off ? (
                  <InputGroup className="w-full border-none bg-muted shadow-none ring-0">
                    <TimePickerButton
                      value={day.start_time || "09:00"}
                      onChange={(val) => handleTimeChange(index, "start", val)}
                    />
                    <InputGroupText className="flex-1 justify-center px-0 text-xs font-medium text-muted-foreground/40">
                      to
                    </InputGroupText>
                    <TimePickerButton
                      value={day.end_time || "18:00"}
                      onChange={(val) => handleTimeChange(index, "end", val)}
                    />
                  </InputGroup>
                ) : (
                  <InputGroup className="w-full border-none bg-muted/40 shadow-none ring-0">
                    <InputGroupText className="w-full justify-center text-xs font-medium tracking-widest text-muted-foreground/60 uppercase">
                      Day Off
                    </InputGroupText>
                  </InputGroup>
                )}
              </div>
            </Field>
          ))}
        </FieldGroup>
      </div>
    </div>
  )
}

const TimePickerButton = ({
  value,
  onChange,
}: {
  value: string
  onChange: (val: string) => void
}) => {
  const [open, setOpen] = useState(false)

  // Split "HH:mm"
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
