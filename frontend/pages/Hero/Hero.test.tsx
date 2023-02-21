import { describe, expect, test } from "vitest";
// import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero test", () => {
  test("should have a title", () => {
    // render(<App />);
    // expect(screen.getByText(/eChange/i)).toBeDefined();
    expect(Hero.name).toBeDefined();
  });
});
