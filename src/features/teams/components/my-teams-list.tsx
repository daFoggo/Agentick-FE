import { useQuery } from "@tanstack/react-query"
import { Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { teamQueries } from "@/features/teams/queries"

export function MyTeamsList() {
  const { data: teams = [], isLoading } = useQuery(teamQueries.myTeams())

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <span>My Teams</span>
        </CardTitle>
        <div className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
          {teams.length}
        </div>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-y-auto">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        ) : teams.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
            <Users className="mb-2 size-8 text-muted-foreground/30" />
            <p className="text-sm">You haven't joined any teams.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {teams.map((team) => (
              <div
                key={team.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border bg-muted p-2 transition-colors hover:bg-muted/80"
              >
                <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted/50">
                  {team.avatar_url && team.avatar_url !== "" ? (
                    <img
                      src={team.avatar_url}
                      alt={team.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-xs font-medium text-muted-foreground uppercase">
                      {team.name.slice(0, 2)}
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{team.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {team.description || "Team collaboration space"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
