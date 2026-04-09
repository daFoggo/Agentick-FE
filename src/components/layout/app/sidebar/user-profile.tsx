import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useSuspenseQuery } from "@tanstack/react-query"
import { userQueries } from "@/features/users"

export const UserProfile = () => {
  const { data: user } = useSuspenseQuery(userQueries.me())

  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "??"

  return (
    <SidebarMenuItem>
      <SidebarMenuButton size="lg">
        <Avatar size="sm">
          {user?.avatarUrl && (
            <AvatarImage src={user.avatarUrl} alt={user.name} />
          )}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start text-sm leading-tight">
          <span className="max-w-[150px] truncate font-semibold">
            {user?.name}
          </span>
          <span className="max-w-[150px] truncate text-xs text-muted-foreground">
            {user?.email}
          </span>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
