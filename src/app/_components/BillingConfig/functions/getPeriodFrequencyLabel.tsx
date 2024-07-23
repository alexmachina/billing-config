import { PeriodUnit } from "../types";

function getPeriodFrequencyLabel(unit: PeriodUnit) {
  return (
    {
      Days: "Daily Payment",
      Weeks: "Weekly Payment",
      Months: "Monthly Payment",
    }[unit] || "Daily Payment"
  );
}

export default getPeriodFrequencyLabel;
