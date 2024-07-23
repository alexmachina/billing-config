import * as yup from "yup";

export type BillingConfigSchema = yup.InferType<typeof schema>;
export type Duration = "Customize" | "Never Ends";
export type PeriodUnit = "Days" | "Weeks" | "Months";
export type NullablePeriodUnit = PeriodUnit | "None";
export enum Permutations {
  NoTrial_NeverEndingSubscription = "NoTrial_NeverEndingSubscription",
  NoTrial_EndingSubscription = "NoTrial_EndingSubscription",
  Trial_NeverEndingSubscription = "Trial_NeverEndingSubscription",
  Trial_EndingSubscription = "Trial_EndingSubscription",
}

export const schema = yup.object({
  initialPrice: yup
    .number()
    .min(0, "must be positive or 0")
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable(),

  billingFrequency: yup.object({
    unit: yup
      .mixed<PeriodUnit>()
      .oneOf(["Days", "Weeks", "Months"])
      .default("Days")
      .required("required"),
    count: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .positive("must be positive")
      .required("required"),
  }),

  periodPayment: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .min(0)
    .required("required"),

  trialPeriod: yup.object({
    count: yup.number().when("unit", ([unit]) => {
      return unit === "None"
        ? yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
        : yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .positive("must be positive")
            .required("required");
    }),
    unit: yup
      .mixed<NullablePeriodUnit>()
      .oneOf(["None", "Days", "Weeks", "Months"])
      .default("None")
      .required("required"),
  }),

  billingCycles: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .when("duration", ([duration]) => {
      return duration === "Customize"
        ? yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .positive("must be positive")
            .required("required")
        : yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .default(0)
            .nullable();
    }),

  duration: yup
    .mixed<Duration>()
    .oneOf(["Never Ends", "Customize"])
    .required()
    .default("Never Ends"),
});
