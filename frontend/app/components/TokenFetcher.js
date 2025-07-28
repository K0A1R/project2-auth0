"use client";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function TokenFetcher() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently();
          setToken(accessToken);
          console.log("Access Token:", accessToken);
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
    };
    fetchToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return token ? (
    <div className="p-4 border border-green-600/80 rounded-lg items-center mt-3">
      <p className="">Access Token fetched successfully!</p>
      <p className="bg-gray-100 p-4 rounded text-wrap break-all">{token}</p>
    </div>
  ) : null;
}
