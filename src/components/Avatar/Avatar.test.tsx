import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders an image when src is provided", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="John Doe" />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "John Doe");
  });

  it("renders initials fallback when no src", () => {
    render(<Avatar alt="John Doe" fallback="JD" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("applies size variant", () => {
    const { container } = render(<Avatar alt="test" fallback="T" size="lg" />);
    expect(container.firstChild).toHaveClass("h-12");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Avatar ref={ref} alt="test" fallback="T" />);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Avatar alt="User avatar" fallback="UA" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
