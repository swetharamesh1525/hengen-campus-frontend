
"use client";

import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="app-loading">
      <h1>403 - Access Forbidden</h1>

      <p>
        You do not have permission to access this page.
      </p>

      <Link href="/dashboard">
        Go to Dashboard
      </Link>
    </main>
  );
}
