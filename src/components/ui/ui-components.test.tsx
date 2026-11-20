
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EmptyState from "./empty-state";
import ErrorState from "./error-state";
import Skeleton from "./skeleton";

describe("Reusable UI components", () => {
  it("renders the empty state with title and message", () => {
    render(
      <EmptyState
        title="No announcements"
        message="There are no announcements available."
      />
    );

    expect(screen.getByText("No announcements")).toBeInTheDocument();
    expect(
      screen.getByText("There are no announcements available.")
    ).toBeInTheDocument();
  });

  it("renders the error state with message", () => {
    render(
      <ErrorState message="Failed to load data." />
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Failed to load data.")).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <ErrorState
        message="Something failed."
        onRetry={onRetry}
      />
    );

    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("renders the loading skeleton", () => {
    const { container } = render(<Skeleton />);

    expect(container.firstChild).toHaveClass("skeleton");
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("applies custom skeleton dimensions", () => {
    const { container } = render(
      <Skeleton width="200px" height="40px" />
    );

    expect(container.firstChild).toHaveStyle({
      width: "200px",
      height: "40px",
    });
  });
});
