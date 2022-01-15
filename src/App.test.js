import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Input Component test", () => {
  it("should render component", () => {
    render(<App />);
    const inputText = screen.getByText("List of technologies");

    expect(inputText).toBeInTheDocument();
  });
});

//simple test for rendering h1
