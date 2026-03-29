import { Switch } from "@/components/ui/radix-switch"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "."

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <Switch
      className="w-12"
      leftIcon={<Sun className="size-3.5!" />}
      rightIcon={<Moon className="size-3.5!" />}
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
    />
  )
}
