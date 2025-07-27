"use client";
import { Auth0Provider } from "@auth0/auth0-react";

export default function AuthProvider({ children }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN} // Auth0 domain
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID} // Auth0 client ID
      authorizationParams={{
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : undefined,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE, // Auth0 audience
        scope: "openid profile email",
      }}
    >
      {children}
    </Auth0Provider>
  );
}
