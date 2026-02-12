import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Apple, Github, ChromeIcon as Google } from "lucide-react"

interface OAuthButtonsProps {
  mode: "login" | "register"
}

export default function OAuthButtons({ mode }: OAuthButtonsProps) {
  const supabase = createClient()

  const handleOAuthSignIn = async (provider: "google" | "apple" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback/${provider}`,
      },
    })

    if (error) {
      console.error("OAuth error:", error.message)
      alert(`Fehler bei ${provider}-${mode}: ${error.message}`)
    }
  }

  const label = (prov: string) => (mode === "login" ? `Mit ${prov} anmelden` : `Mit ${prov} registrieren`)

  return (
    <div className="flex flex-col space-y-3">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 bg-transparent"
        onClick={() => handleOAuthSignIn("google")}
      >
        <Google className="h-5 w-5" />
        {label("Google")}
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 bg-transparent"
        onClick={() => handleOAuthSignIn("apple")}
      >
        <Apple className="h-5 w-5" />
        {label("Apple")}
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 bg-transparent"
        onClick={() => handleOAuthSignIn("github")}
      >
        <Github className="h-5 w-5" />
        {label("GitHub")}
      </Button>
    </div>
  )
}
