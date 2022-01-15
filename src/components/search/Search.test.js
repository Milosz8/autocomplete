import React from "react";
import { render, screen } from "@testing-library/react";
import Search from "./Search";

describe("Input Component test", () => {
  it("should render component", () => {
    render(<Search />);
    const listOfSelectedTech = screen.getByTestId("listOfSelectedTech");
    expect(listOfSelectedTech).toBeInTheDocument();
  });
});

//simple tests for rendering ul
