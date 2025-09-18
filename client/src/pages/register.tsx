import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="bg-gradient-custom rounded-md flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
    {/* <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"> */}
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <img src="/Nexus-Logo.png" alt="Nexus Logo" className="h-8 w-8" />
          Nexus.
        </a>
        <RegisterForm />
      </div>
    </div>
  )
}
