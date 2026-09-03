import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders with status role", () => {
    render(<Spinner aria-label="Loading" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("has accessible label", () => {
    render(<Spinner aria-label="Loading content" />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-label", "Loading content");
  });

  it("applies size variant", () => {
    const { container } = render(<Spinner size="lg" aria-label="Loading" />);
    expect(container.querySelector("svg")).toHaveClass("h-8");
  });

  it("merges custom className", () => {
    const { container } = render(<Spinner className="custom" aria-label="Loading" />);
    expect(container.firstChild).toHaveClass("custom");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Spinner aria-label="Loading" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
