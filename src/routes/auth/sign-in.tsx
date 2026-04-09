import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { AuthPageHeader } from "@/components/layout/auth/page-header"
import { SignInForm } from "@/features/auth"

export const Route = createFileRoute("/auth/sign-in")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: SignInPage,
})

function SignInPage() {
  const { redirect } = Route.useSearch()

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background p-6">
      <AuthPageHeader />
      <main className="flex flex-1 items-center justify-center">
        <SignInForm redirect={redirect} />
      </main>
    </div>
  )
}
