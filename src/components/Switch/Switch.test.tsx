import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders with switch role", () => {
    render(<Switch aria-label="Toggle" />);
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("toggles on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch aria-label="Toggle" onCheckedChange={onChange} />);
    await user.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("supports controlled checked state", () => {
    render(<Switch aria-label="Toggle" checked />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Switch ref={ref} aria-label="Toggle" />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it("supports keyboard toggle with Space", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch aria-label="Toggle" onCheckedChange={onChange} />);
    screen.getByRole("switch").focus();
    await user.keyboard(" ");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Switch aria-label="Enable notifications" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
