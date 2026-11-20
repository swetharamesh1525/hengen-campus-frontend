
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="app-loading">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      <Link href="/dashboard">
        Go to Dashboard
      </Link>
    </main>
  );
}
