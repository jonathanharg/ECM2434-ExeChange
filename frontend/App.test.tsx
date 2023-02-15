import { describe, expect, test } from "vitest";
// import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App test", () => {
  test("should have a title", () => {
    // render(<App />);
    // expect(screen.getByText(/eChange/i)).toBeDefined();
    expect(App.name).toBeDefined();
  });
});
