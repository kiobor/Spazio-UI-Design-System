import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("shows tooltip on hover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful tip">
        <button>Hover me</button>
      </Tooltip>,
    );
    await user.hover(screen.getByRole("button"));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful tip");
  });

  it("hides tooltip on mouse leave", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Helpful tip">
        <button>Hover me</button>
      </Tooltip>,
    );
    await user.hover(screen.getByRole("button"));
    await screen.findByRole("tooltip");
    await user.unhover(screen.getByRole("button"));
    await vi.waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it("shows tooltip on focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Focus tip">
        <button>Focus me</button>
      </Tooltip>,
    );
    await user.tab();
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Focus tip");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Tooltip content="Tip">
        <button>Action</button>
      </Tooltip>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
