import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { EVENT_TYPE_OPTIONS } from "../constants"

export const EventTypeFilter = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    EVENT_TYPE_OPTIONS.map((opt) => opt.value)
  )

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-1 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="group w-full">
            Show Events
            <ChevronDownIcon className="ml-auto transition-all duration-200 group-data-[state=open]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-1 pt-1">
        <div className="grid gap-1">
          {EVENT_TYPE_OPTIONS.map((option) => (
            <div
              key={option.value}
              className="group flex items-center space-x-2 rounded-lg px-2 py-1.5 transition-all duration-200 hover:bg-muted/50"
            >
              <Checkbox
                id={`filter-${option.value}`}
                checked={selectedTypes.includes(option.value)}
                onCheckedChange={() => toggleType(option.value)}
                className="size-4"
              />
              <Label
                htmlFor={`filter-${option.value}`}
                className="flex flex-1 cursor-pointer items-center gap-2.5 text-sm font-medium select-none"
              >
                <option.icon className={cn("size-3.5", option.color)} />
                <span className="text-foreground/70 transition-colors group-hover:text-foreground">
                  {option.label}
                </span>
              </Label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
