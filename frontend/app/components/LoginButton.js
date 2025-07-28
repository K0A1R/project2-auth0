"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function LoginButton() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      setError("Failed to log in");
    }
  };

  const handleLogout = () => {
    try {
      logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    } catch (error) {
      setError("Failed to log out");
    }
  };

  return (
    <div>
      <button
        onClick={() => (isAuthenticated ? handleLogout() : handleLogin())}
        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded"
      >
        {isAuthenticated ? "Log Out" : "Log In"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
