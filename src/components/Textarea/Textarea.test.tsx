import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea aria-label="message" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea ref={ref} aria-label="test" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="test" />);
    await user.type(screen.getByRole("textbox"), "hello");
    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("applies error variant", () => {
    const { container } = render(<Textarea variant="error" aria-label="test" />);
    expect(container.firstChild).toHaveClass("border-destructive");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <label>
        Message
        <Textarea />
      </label>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
