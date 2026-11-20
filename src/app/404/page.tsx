
import Link from "next/link";

export default function Custom404Page() {
  return (
    <main className="app-loading">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, this page does not exist.</p>

      <Link href="/dashboard">
        Go to Dashboard
      </Link>
    </main>
  );
}
