import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";

function TestComponent() {
  const { toast } = useToast();
  return (
    <button onClick={() => toast({ title: "Success!", variant: "success" })}>
      Show Toast
    </button>
  );
}

function renderWithProvider() {
  return render(
    <ToastProvider>
      <TestComponent />
    </ToastProvider>,
  );
}

describe("Toast", () => {
  it("shows toast when triggered", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await user.click(screen.getByRole("button", { name: "Show Toast" }));
    expect(screen.getByText("Success!")).toBeVisible();
  });

  it("has role status for non-error toasts", async () => {
    const user = userEvent.setup();
    renderWithProvider();
    await user.click(screen.getByRole("button", { name: "Show Toast" }));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("auto-dismisses after duration", () => {
    vi.useFakeTimers();
    renderWithProvider();
    fireEvent.click(screen.getByRole("button", { name: "Show Toast" }));
    expect(screen.getByText("Success!")).toBeVisible();
    act(() => vi.advanceTimersByTime(5100));
    expect(screen.queryByText("Success!")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("has no accessibility violations", async () => {
    const user = userEvent.setup();
    const { container } = renderWithProvider();
    await user.click(screen.getByRole("button", { name: "Show Toast" }));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
