"use client";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// This components calls the protected API in the backend and displays the response
export default function CallProtectedApi() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const callApi = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently();
        const res = await fetch("http://localhost:8080/api/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const text = await res.text();
        setResponse(text);
      } catch (error) {
        console.error("Error calling protected API:", error);
      }
    };
    callApi();
  }, [isAuthenticated, getAccessTokenSilently]);

  return (
    <div className="mt-4 p-4 bg-green-100 rounded">
      <h2 className="font-semibold text-lg">Protected API Response:</h2>
      <p className="mt-2">{response}</p>
    </div>
  )
}
