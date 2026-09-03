import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input aria-label="test input" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} aria-label="test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="test" />);
    const input = screen.getByRole("textbox");
    await user.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("applies error variant", () => {
    const { container } = render(<Input variant="error" aria-label="test" />);
    expect(container.firstChild).toHaveClass("border-destructive");
  });

  it("merges custom className", () => {
    const { container } = render(<Input className="custom" aria-label="test" />);
    expect(container.firstChild).toHaveClass("custom");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <label>
        Email
        <Input type="email" />
      </label>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
