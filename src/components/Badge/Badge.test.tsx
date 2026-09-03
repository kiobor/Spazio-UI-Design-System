import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders with text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container } = render(<Badge variant="outline">Beta</Badge>);
    expect(container.firstChild).toHaveClass("border");
  });

  it("applies color classes", () => {
    const { container } = render(<Badge color="success">Active</Badge>);
    expect(container.firstChild).toHaveClass("bg-success");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Badge ref={ref}>Test</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("merges custom className", () => {
    const { container } = render(<Badge className="custom">Test</Badge>);
    expect(container.firstChild).toHaveClass("custom");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Badge>Status</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
