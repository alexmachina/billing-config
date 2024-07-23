import {
  BillingConfigSchema,
  NullablePeriodUnit,
  PeriodUnit,
  Permutations,
} from "../types";

const getPermutation = (values: BillingConfigSchema): Permutations => {
  const hasTrial = values.trialPeriod?.count && values.trialPeriod.unit;
  const hasEndingSubscrition = values.duration === "Customize";

  if (!hasTrial && !hasEndingSubscrition) {
    return Permutations.NoTrial_NeverEndingSubscription;
  }

  if (!hasTrial && hasEndingSubscrition) {
    return Permutations.NoTrial_EndingSubscription;
  }

  if (hasTrial && !hasEndingSubscrition) {
    return Permutations.Trial_NeverEndingSubscription;
  }

  if (hasTrial && hasEndingSubscrition) {
    return Permutations.Trial_EndingSubscription;
  }

  throw new Error("no permutation found");
};

function displayTime(unit: PeriodUnit | NullablePeriodUnit, amount: number) {
  return `${amount} ${unit.toLowerCase()}`;
}

function displayPrice(price: number) {
  return `$${price}`;
}

function calcTotalAmountPaid(values: BillingConfigSchema) {
  const total =
    (values.billingCycles || 0) *
    values.billingFrequency.count *
    (values.initialPrice || 0);

  return `$${total}`;
}

function getDescriptionByPermutation(
  permutation: Permutations,
  values: BillingConfigSchema
): string {
  const initialPrice = displayPrice(values.initialPrice || 0);
  const paymentAmount = displayPrice(values.periodPayment);
  const billingPeriod = displayTime(
    values.billingFrequency.unit,
    +values.billingFrequency.count
  );
  const billingCycles = values.billingCycles;
  const totalAmountPaid = calcTotalAmountPaid(values);

  if (permutation === Permutations.NoTrial_NeverEndingSubscription) {
    return `Your customer will be charged ${initialPrice} immediately and then ${paymentAmount} every ${billingPeriod} until they cancel. `;
  }

  if (permutation === Permutations.NoTrial_EndingSubscription) {
    return `Your customer will be charged ${initialPrice} immediately and then ${paymentAmount} every ${billingPeriod}, ${billingCycles} times. The total amount paid will be ${totalAmountPaid}.`;
  }

  if (permutation === Permutations.Trial_NeverEndingSubscription) {
    const timeTrial = displayTime(
      values.trialPeriod?.unit,
      +values.trialPeriod?.count!
    );
    const billingPeriod = displayTime(
      values.billingFrequency.unit,
      +values.billingFrequency.count
    );
    return `Your customer will be charged ${initialPrice} immediately for their ${timeTrial} trial, and then ${paymentAmount} every ${billingPeriod} until they cancel.`;
  }

  if (permutation === Permutations.Trial_EndingSubscription) {
    const timeTrial = displayTime(
      values.trialPeriod?.unit!,
      +values.trialPeriod?.count!
    );

    const billingPeriod = displayTime(
      values.billingFrequency.unit,
      +values.billingFrequency.count
    );

    return `Your customer will be charged ${initialPrice} immediately for their ${timeTrial} trial, and then ${paymentAmount} every ${billingPeriod}, ${billingCycles} times. The total amount paid will be ${totalAmountPaid}.`;
  }

  throw "Unknown permutation";
}

function displayDescription(values: BillingConfigSchema) {
  const permutation = getPermutation(values);
  const description = getDescriptionByPermutation(permutation, values);
  return description;
}

export default displayDescription;
