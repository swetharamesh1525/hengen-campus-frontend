
"use client";
import QueryProvider from "./query-provider";
import { useEffect, useState } from "react";

type MSWWindow = Window & {
  __hengenMswStartPromise?: Promise<void>;
};

async function startMockWorker() {
  const browserWindow = window as MSWWindow;

  if (!browserWindow.__hengenMswStartPromise) {
    browserWindow.__hengenMswStartPromise = (async () => {
      const { worker } = await import("@/mocks/browser");

      await worker.start({
        onUnhandledRequest: "bypass",
      });
    })().catch((error) => {
      browserWindow.__hengenMswStartPromise = undefined;
      throw error;
    });
  }

  await browserWindow.__hengenMswStartPromise;
}

export function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function enableMocking() {
      if (process.env.NODE_ENV !== "development") {
        setReady(true);
        return;
      }

      await startMockWorker();
      setReady(true);
    }

    enableMocking().catch((error) => {
      console.error("MSW startup failed:", error);
    });
  }, []);

  if (!ready && process.env.NODE_ENV === "development") {
    return null;
  }

  return <>{children}</>;
}
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MSWProvider>
      <QueryProvider>{children}</QueryProvider>
    </MSWProvider>
  );
}