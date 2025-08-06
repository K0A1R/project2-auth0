import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";
import Link from "next/link";
import TokenFetcher from "./components/TokenFetcher";

export default function Home() {
  return (
    <main className="p-24">
      <h1 className="text-2xl font-bold mb-4">Project 2 using Auth0</h1>
      <Profile />
      <TokenFetcher />
      <LoginButton />
      <Link
        href="/protected"
        className="mt-4 inline-block text-blue-600 hover:underline ml-3"
      >
        Go to Protected Page
      </Link>
    </main>
  );
}
