import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ITaskConfigListItem {
  id: string
  name: string
  color?: string
  isDefault?: boolean
  meta?: string
}

interface ITaskConfigListPanelProps {
  title: string
  description: string
  items: ITaskConfigListItem[]
  isLoading?: boolean
  emptyMessage?: string
}

export const TaskConfigListPanel = ({
  title,
  description,
  items,
  isLoading,
  emptyMessage = "No configuration found.",
}: ITaskConfigListPanelProps) => {
  return (
    <Card className="max-w-3xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-md border px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full border"
                    style={item.color ? { backgroundColor: item.color } : undefined}
                  />
                  <span className="font-medium">{item.name}</span>
                  {item.isDefault ? <Badge variant="secondary">Default</Badge> : null}
                </div>
                {item.meta ? (
                  <span className="text-sm text-muted-foreground">{item.meta}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
