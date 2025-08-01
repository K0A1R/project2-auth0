"use client";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

export default function APISecurityTest() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [logs, setLogs] = useState([]);

  const logResult = (label, status, message) => {
    setLogs((prev) => [
      ...prev,
      { label, status, message, time: new Date().toLocaleTimeString() },
    ]);
  };

  const callWithoutToken = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/protected");
      const text = await res.text();
      logResult("No Token", res.status, text);
    } catch (err) {
      logResult("No Token", "Error", err.message);
    }
  };

  const callWithValidToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch("http://localhost:8080/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const text = await res.text();
      logResult("Valid Token", res.status, text);
    } catch (err) {
      logResult("Valid Token", "Error", err.message);
    }
  };

  const callWithInvalidToken = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/protected", {
        headers: {
          Authorization: `Bearer faketoken123`,
        },
      });
      const text = await res.text();
      logResult("Invalid Token", res.status, text);
    } catch (err) {
      logResult("Invalid Token", "Error", err.message);
    }
  };

  return (
    <div className="mt-6 p-4 border rounded inline-block">
      <h2 className="text-xl font-bold mb-2">Auth0 Security Test</h2>
      <div className="flex gap-4 mb-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          onClick={callWithoutToken}
        >
          No Token
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={callWithValidToken}
          disabled={!isAuthenticated}
        >
          Valid Token
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          onClick={callWithInvalidToken}
        >
          Invalid Token
        </button>
      </div>

      <ul className="text-sm">
        {logs.map((entry, idx) => (
          <li key={idx}>
            <strong>{entry.time}</strong> [{entry.label}] →{" "}
            <code>{entry.status}</code>: {entry.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
