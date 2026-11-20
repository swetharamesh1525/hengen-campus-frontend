
import { http, HttpResponse, delay } from "msw";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

// Handle mock scenarios
async function handleScenario(request: Request) {
  const scenario = new URL(request.url).searchParams.get("scenario");

  if (scenario === "slow") {
    await delay(3000);
  }

  if (scenario === "error") {
    return HttpResponse.json(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong. Please try again.",
        },
      },
      { status: 500 }
    );
  }

  return null;
}

export const handlers = [
  // Get logged-in user details
  http.get(`${API_BASE_URL}/me`, async ({ request }) => {
    const scenarioResponse = await handleScenario(request);

    if (scenarioResponse) return scenarioResponse;

    const token = request.headers.get("Authorization");

    if (token !== "Bearer mock-access-token-123") {
      return HttpResponse.json(
        {
          error: {
            code: "UNAUTHENTICATED",
            message: "Authentication required",
          },
        },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      data: {
        id: "user-001",
        name: "Swetha",
        role: "teacher",
        schoolId: "school-001",
        locale: "en",
      },
    });
  }),

  // Refresh access token
  http.post(`${API_BASE_URL}/auth/refresh`, async ({ request }) => {
    const scenarioResponse = await handleScenario(request);

    if (scenarioResponse) return scenarioResponse;

    return HttpResponse.json({
      data: {
        accessToken: "mock-access-token-123",
      },
    });
  }),

  // Get announcements
  http.get(`${API_BASE_URL}/announcements`, async ({ request }) => {
    const scenarioResponse = await handleScenario(request);

    if (scenarioResponse) return scenarioResponse;

    const scenario = new URL(request.url).searchParams.get("scenario");

    if (scenario === "empty") {
      return HttpResponse.json({ data: [] });
    }

    return HttpResponse.json({
      data: [
        {
          id: "announcement-001",
          title: "Welcome to Hengen Campus",
          message: "Welcome to the campus portal.",
        },
      ],
    });
  }),
];
