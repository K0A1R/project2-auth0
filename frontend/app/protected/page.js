"use client";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CallProtectedApi from "../components/CallProtectedApi";
import LoginButton from "../components/LoginButton";
import APISecurityTest from "../components/ApiSecurityTest";

function ProtectedPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Protected Page</h1>
      <p>This page is protected and requires authentication.</p>
      <CallProtectedApi />
      <APISecurityTest />
      <LoginButton />
    </div>
  );
}

export default withAuthenticationRequired(ProtectedPage, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
