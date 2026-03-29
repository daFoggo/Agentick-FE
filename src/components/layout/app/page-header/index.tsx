import { useMatches } from "@tanstack/react-router"

export const PageHeader = () => {
  const matches = useMatches()
  const titledMatches = matches.filter((m) => m.staticData?.getTitle)
  const currentTitle = titledMatches.at(-1)?.staticData.getTitle?.()

  if (!currentTitle) return null

  return (
    <div className="flex items-center">
      <p className="text-xl font-semibold text-foreground">{currentTitle}</p>
    </div>
  )
}
