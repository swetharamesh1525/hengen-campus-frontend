
import type { UserRole } from "./auth";

const rolePermissions: Record<UserRole, string[]> = {
  principal: [
    "/dashboard",
    "/attendance",
    "/announcements",
    "/fees",
  ],

  accountant: [
    "/dashboard",
    "/fees",
  ],

  teacher: [
    "/dashboard",
    "/attendance",
    "/announcements",
  ],

  super_admin: [
    "/dashboard",
    "/schools",
    "/users",
    "/settings",
  ],
};

export function canAccessRoute(
  role: UserRole,
  pathname: string
): boolean {
  const allowedRoutes = rolePermissions[role];

  return allowedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`)
  );
}
