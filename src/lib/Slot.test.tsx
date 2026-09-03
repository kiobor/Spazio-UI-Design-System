import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Slot } from "./Slot";

describe("Slot", () => {
  it("renders child element with merged props", () => {
    render(
      <Slot data-testid="slot" className="slot-class">
        <a href="/test" className="child-class">
          Link
        </a>
      </Slot>,
    );

    const el = screen.getByTestId("slot");
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "/test");
    expect(el.className).toContain("slot-class");
    expect(el.className).toContain("child-class");
  });

  it("forwards ref to child", () => {
    const ref = { current: null as HTMLAnchorElement | null };
    render(
      <Slot ref={ref}>
        <a href="/test">Link</a>
      </Slot>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Slot>
        <a href="/test">Link</a>
      </Slot>,
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
