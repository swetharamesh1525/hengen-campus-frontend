
"use client";

import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import Skeleton from "@/components/ui/skeleton";
import EmptyState from "@/components/ui/empty-state";
import ErrorState from "@/components/ui/error-state";

type Announcement = {
  id: string;
  title: string;
  message: string;
};

type AnnouncementsResponse = {
  data: Announcement[];
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnnouncements = useCallback(() => {
    const scenario = new URLSearchParams(
      window.location.search
    ).get("scenario");

    const query = scenario
      ? `?scenario=${encodeURIComponent(scenario)}`
      : "";

    return apiRequest<AnnouncementsResponse>(
      `/announcements${query}`
    );
  }, []);

  useEffect(() => {
    let active = true;

    loadAnnouncements()
      .then((response) => {
        if (active) {
          setAnnouncements(response.data);
          setError("");
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load announcements."
          );
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [loadAnnouncements]);

  const handleRetry = () => {
    setLoading(true);
    setError("");

    loadAnnouncements()
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load announcements."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <section>
        <h1>Announcements</h1>
        <Skeleton height="24px" width="60%" />
        <Skeleton height="80px" />
      </section>
    );
  }

  if (error) {
    return (
      <ErrorState message={error} onRetry={handleRetry} />
    );
  }

  if (announcements.length === 0) {
    return (
      <EmptyState
        title="No announcements"
        message="There are no announcements available right now."
      />
    );
  }

  return (
    <section>
      <h1>Announcements</h1>
      {announcements.map((announcement) => (
        <article key={announcement.id}>
          <h2>{announcement.title}</h2>
          <p>{announcement.message}</p>
        </article>
      ))}
    </section>
  );
}
