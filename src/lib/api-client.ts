import type { MeResponse } from "./auth";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

type ApiErrorEnvelope = {
  error?: {
    code?: string;
    message?: string;
  };
};

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

// Try refreshing the access token once
async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
    });

    if (!response.ok) return false;

    const body = await response.json();
    const newToken = body.data?.accessToken;

    if (typeof newToken !== "string" || !newToken) return false;

    setAccessToken(newToken);
    return true;
  } catch {
    return false;
  }
}

// Logout and return to login
function logout() {
  setAccessToken(null);
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  const method = (options.method ?? "GET").toUpperCase();

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const writeMethods = ["POST", "PUT", "PATCH", "DELETE"];

  if (writeMethods.includes(method) && !headers.has("Idempotency-Key")) {
    headers.set("Idempotency-Key", crypto.randomUUID());
  }

  if (
    options.body &&
    typeof FormData !== "undefined" &&
    !(options.body instanceof FormData)
  ) {
    headers.set("Content-Type", "application/json");
  }

  const makeRequest = () =>
    fetch(`${API_BASE_URL}${path}`, {
      ...options,
      method,
      headers,
    });

  let response = await makeRequest();

  // If unauthorized, refresh token and retry once
  if (response.status === 401) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      headers.set("Authorization", `Bearer ${accessToken}`);
      response = await makeRequest();
    }

    // Logout if refresh fails or retry is still unauthorized
    if (!refreshed || response.status === 401) {
      logout();
    }
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const errorBody = body as ApiErrorEnvelope | null;

    throw new ApiError(
      response.status,
      errorBody?.error?.message ?? "Something went wrong",
      errorBody?.error?.code
    );
  }

  return body as T;
}
// Get logged-in user details
export async function getMe() {
  return apiRequest<MeResponse>("/me");
}