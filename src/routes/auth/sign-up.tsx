import { createFileRoute } from "@tanstack/react-router"
import { AuthPageHeader } from "@/components/layout/auth/page-header"
import { SignUpForm } from "@/features/auth"

export const Route = createFileRoute("/auth/sign-up")({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background p-6">
      <AuthPageHeader />

      <main className="flex flex-1 items-center justify-center">
        <SignUpForm />
      </main>
    </div>
  )
}
