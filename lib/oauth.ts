// OAuth Integration Utilities
export interface OAuthProvider {
  name: string
  clientId: string
  redirectUri: string
}

export const oauthProviders = {
  google: {
    name: "Google",
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/google`,
    scope: "openid email profile",
    authUrl: "https://accounts.google.com/oauth/authorize",
  },
  apple: {
    name: "Apple",
    clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/apple`,
    scope: "name email",
    authUrl: "https://appleid.apple.com/auth/authorize",
  },
  facebook: {
    name: "Facebook",
    clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || "",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback/facebook`,
    scope: "email public_profile",
    authUrl: "https://www.facebook.com/v18.0/dialog/oauth",
  },
}

export function generateOAuthUrl(provider: keyof typeof oauthProviders): string {
  const config = oauthProviders[provider]
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    scope: config.scope,
    response_type: "code",
    state: generateState(),
  })

  // Apple-spezifische Parameter
  if (provider === "apple") {
    params.append("response_mode", "form_post")
  }

  return `${config.authUrl}?${params.toString()}`
}

function generateState(): string {
  return btoa(
    JSON.stringify({
      timestamp: Date.now(),
      random: Math.random().toString(36).substring(2),
    }),
  )
}

export async function handleOAuthCallback(
  provider: keyof typeof oauthProviders,
  code: string,
  state: string,
): Promise<{ user: any; token: string } | null> {
  try {
    // Hier würde die echte OAuth-Verarbeitung stattfinden
    // 1. Code gegen Access Token tauschen
    // 2. Benutzerinformationen abrufen
    // 3. Benutzer in der Datenbank erstellen/aktualisieren
    // 4. JWT Token generieren

    console.log(`Processing ${provider} OAuth callback with code: ${code}`)

    // Demo-Implementierung
    return {
      user: {
        id: `${provider}_${Date.now()}`,
        email: `user@${provider}.com`,
        name: `${provider} User`,
        provider,
      },
      token: "demo_jwt_token",
    }
  } catch (error) {
    console.error(`OAuth ${provider} error:`, error)
    return null
  }
}
