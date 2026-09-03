import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

describe("Select", () => {
  const options = (
    <>
      <option value="">Choose...</option>
      <option value="a">Option A</option>
      <option value="b">Option B</option>
    </>
  );

  it("renders a select element", () => {
    render(<Select aria-label="test">{options}</Select>);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLSelectElement | null };
    render(<Select ref={ref} aria-label="test">{options}</Select>);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it("handles selection", async () => {
    const user = userEvent.setup();
    render(<Select aria-label="test">{options}</Select>);
    await user.selectOptions(screen.getByRole("combobox"), "a");
    expect(screen.getByRole("combobox")).toHaveValue("a");
  });

  it("applies error variant", () => {
    const { container } = render(<Select variant="error" aria-label="test">{options}</Select>);
    expect(container.firstChild).toHaveClass("border-destructive");
  });

  it("merges custom className", () => {
    const { container } = render(<Select className="custom" aria-label="test">{options}</Select>);
    expect(container.firstChild).toHaveClass("custom");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <label>
        Country
        <Select>{options}</Select>
      </label>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
