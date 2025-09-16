import { Blocks } from "lucide-react";
import { ForgotPasswordForm } from "../components/forgot-password-form";
import gradientImage from "@/assets/images/gradient/abstract-gradient-background-with-grain-texture-captivating-noise-airbrush-minimalist-wallpaper.jpg";

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Blocks className="size-4" />
            </div>
            Nexus
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={gradientImage}
          alt="Abstract gradient background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}