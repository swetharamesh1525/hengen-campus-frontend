import { describe, it, expect } from "vitest";
import { canAccessRoute } from "./permission";

describe("Role-based route permissions", () => {
  it("allows teachers to access attendance", () => {
    expect(canAccessRoute("teacher", "/attendance")).toBe(true);
  });

  it("prevents teachers from accessing fees", () => {
    expect(canAccessRoute("teacher", "/fees")).toBe(false);
  });

  it("allows accountants to access fees", () => {
    expect(canAccessRoute("accountant", "/fees")).toBe(true);
  });

  it("allows principals to access announcements", () => {
    expect(canAccessRoute("principal", "/announcements")).toBe(true);
  });

  it("allows super admins to access settings", () => {
    expect(canAccessRoute("super_admin", "/settings")).toBe(true);
  });

  it("prevents users from accessing unknown routes", () => {
    expect(canAccessRoute("teacher", "/unknown")).toBe(false);
  });
});