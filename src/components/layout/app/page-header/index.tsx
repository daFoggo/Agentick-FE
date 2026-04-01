import { useMatches } from "@tanstack/react-router"

export const PageHeader = () => {
  const matches = useMatches()

  const headerSource = [...matches]
    .reverse()
    .find(
      (match) =>
        match.staticData?.header ||
        match.staticData?.getTitle ||
        match.staticData?.hideHeader
    )

  const staticData = headerSource?.staticData
  if (!staticData) return null

  const shouldHide = staticData.header?.hide ?? staticData.hideHeader
  if (shouldHide) return null

  if (staticData.header?.render) {
    return (
      <div className="flex items-center w-full">
        {staticData.header.render()}
      </div>
    )
  }

  const customTitle =
    typeof staticData.header?.title === "function"
      ? staticData.header.title()
      : staticData.header?.title

  const title = customTitle ?? staticData.getTitle?.()
  if (!title) return null

  return (
    <div className="flex items-center">
      <p className="font-semibold text-foreground text-xl">{title}</p>
    </div>
  )
}
