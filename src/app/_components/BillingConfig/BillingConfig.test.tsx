import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import BillingConfig from "./BillingConfig";

describe("BillingConfig", () => {
  it("Should render all fields", async () => {
    await act(async () => {
      render(<BillingConfig />);
    });

    expect(screen.getByText("Initial Price")).toBeInTheDocument();
    expect(screen.getByText("Billing Frequency")).toBeInTheDocument();
    expect(screen.getByText("Daily Payment")).toBeInTheDocument();
    expect(screen.getByText("Trial Period")).toBeInTheDocument();
    expect(screen.getByText("Duration")).toBeInTheDocument();
  });

  // TODO: add complete test cases here.
});
