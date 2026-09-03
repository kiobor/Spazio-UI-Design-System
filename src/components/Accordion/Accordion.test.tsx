import { describe, it, expect } from "vitest";
import { axe } from "vitest-axe";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./Accordion";

describe("Accordion", () => {
  const renderAccordion = (type: "single" | "multiple" = "single") =>
    render(
      <Accordion type={type}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

  it("renders triggers as buttons", () => {
    renderAccordion();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("expands on click", async () => {
    const user = userEvent.setup();
    renderAccordion();
    await user.click(screen.getByRole("button", { name: "Section 1" }));
    expect(screen.getByText("Content 1")).toBeVisible();
  });

  it("collapses other items in single mode", async () => {
    const user = userEvent.setup();
    renderAccordion("single");
    await user.click(screen.getByRole("button", { name: "Section 1" }));
    await user.click(screen.getByRole("button", { name: "Section 2" }));
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  it("keeps multiple items open in multiple mode", async () => {
    const user = userEvent.setup();
    renderAccordion("multiple");
    await user.click(screen.getByRole("button", { name: "Section 1" }));
    await user.click(screen.getByRole("button", { name: "Section 2" }));
    expect(screen.getByText("Content 1")).toBeVisible();
    expect(screen.getByText("Content 2")).toBeVisible();
  });

  it("has aria-expanded attribute", async () => {
    const user = userEvent.setup();
    renderAccordion();
    const trigger = screen.getByRole("button", { name: "Section 1" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = renderAccordion();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
