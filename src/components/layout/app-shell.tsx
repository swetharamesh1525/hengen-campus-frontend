
"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiError, getMe } from "@/lib/api-client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { canAccessRoute } from "@/lib/permission";
const navigation = {
  principal: [
    { label: "Dashboard", href: "/dashboard", icon: "⌂" },
    { label: "Attendance", href: "/attendance", icon: "✓" },
    { label: "Announcements", href: "/announcements", icon: "◉" },
    { label: "Fees", href: "/fees", icon: "₹" },
  ],

  accountant: [
    { label: "Dashboard", href: "/dashboard", icon: "⌂" },
    { label: "Fees", href: "/fees", icon: "₹" },
  ],

  teacher: [
    { label: "Dashboard", href: "/dashboard", icon: "⌂" },
    { label: "Attendance", href: "/attendance", icon: "✓" },
    { label: "Announcements", href: "/announcements", icon: "◉" },
  ],

  super_admin: [
    { label: "Dashboard", href: "/dashboard", icon: "⌂" },
    { label: "Schools", href: "/schools", icon: "▦" },
    { label: "Users", href: "/users", icon: "♙" },
    { label: "Settings", href: "/settings", icon: "⚙" },
  ],
};



export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // 1. Fetch user details using TanStack Query
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const currentRole = data?.data.role ?? null;

  // 2. Check role-based route access
 
    // 2. Check role-based route access
const hasAccess = currentRole
  ? canAccessRoute(currentRole, pathname)
  : false;

useEffect(() => {
  if (isError && error instanceof ApiError && error.status === 401) {
    const returnTo = encodeURIComponent(pathname);
    router.replace(`/login?returnTo=${returnTo}`);
  }

  if (!isLoading && !isError && currentRole && !hasAccess) {
    router.replace("/403");
  }
}, [
  isError,
  error,
  pathname,
  router,
  isLoading,
  currentRole,
  hasAccess,
]);

  // 3. Handle API errors
 if (isError) {
  if (error instanceof ApiError && error.status === 401) {
    return (
      <div className="app-loading">
        Redirecting to login...
      </div>
    );
  }

  return (
    <div className="app-loading">
      Failed to load user details. Please try again.
    </div>
  );
}

  // 4. Show loading state
  if (isLoading || !currentRole) {
    return (
      <div className="app-loading">
        Loading campus...
      </div>
    );
  }

  // 5. Check current page access


  if (!hasAccess) {
    return (
      <div className="app-loading">
        Checking access...
      </div>
    );
  }

  // 6. Get navigation for current role
  const menuItems = navigation[currentRole];

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link href="/dashboard" className="brand">
          <span className="brand-icon">H</span>
          <span>Hengen Campus</span>
        </Link>

        <div className="topbar-right">
          <button className="language-button">
            English / தமிழ்
          </button>

          <span className="user-avatar">SW</span>
        </div>
      </header>

      <aside className="sidebar">
        <p className="nav-heading">MENU</p>

        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-item ${
              pathname === item.href ? "active" : ""
            }`}
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </aside>

      <main className="main-content">
        {children}
      </main>

      <nav className="bottom-nav">
        {menuItems.slice(0, 4).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`bottom-nav-item ${
              pathname === item.href ? "active" : ""
            }`}
          >
            <span>{item.icon}</span>
            <small>{item.label}</small>
          </Link>
        ))}
      </nav>
    </div>
  );
}
