"use client";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button
      onClick={() => (isAuthenticated ? handleLogout() : loginWithRedirect())}
      className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isAuthenticated ? "Log Out" : "Log In"}
    </button>
  );
}
