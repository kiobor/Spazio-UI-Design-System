import { expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import * as axeMatchersNamespace from "vitest-axe/matchers";

// vitest-axe's own "vitest-axe/extend-expect" entry point ships empty in the
// installed version (0.1.0), and its matchers.d.ts declares toHaveNoViolations
// as a type-only export even though the JS module exports it as a real
// function — so it's read via a namespace import, cast past the faulty
// type-only declaration, and registered manually here.
const axeMatchers = axeMatchersNamespace as unknown as {
  toHaveNoViolations: (results: unknown) => { pass: boolean; message: () => string };
};

expect.extend({ toHaveNoViolations: axeMatchers.toHaveNoViolations });
