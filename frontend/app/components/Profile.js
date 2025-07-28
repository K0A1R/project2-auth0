"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function Profile() {
  const { user, isAuthenticated, isLoading, error: authError } = useAuth0();
  const [error, setError] = useState(null);

  if (isLoading) return <div>Loading...</div>;
  if (authError)
    return <div className="text-red-500">Error: {authError.message}</div>;

  return (
    isAuthenticated && (
      <div className="mt-4 p-4 border rounded-lg">
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name || "User Avatar"}
            className="w-16 h-16 rounded-full mb-2"
            onError={() => setError("Failed to load user image")}
          />
        )}
        {error && <p className="text-red-500">{error}</p>}
        <h2 className="text-xl font-semibold">{user.name || "Unknown User"}</h2>
        <p>{user.email || "Unknown Email"}</p>
      </div>
    )
  );
}
