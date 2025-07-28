"use client";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    isAuthenticated && (
      <div className="mt-4 p-4 border rounded-lg">
        <img
          src={user.picture}
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
