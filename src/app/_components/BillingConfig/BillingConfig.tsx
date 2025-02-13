"use client";
import { useCallback, useEffect, useMemo } from "react";
import { FormState, SubmitHandler, useForm } from "react-hook-form";
import debounce from "lodash.debounce";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { BillingConfigSchema, schema } from "./types";
import displayDescription from "./functions/displayDescription";
import getPeriodFrequencyLabel from "./functions/getPeriodFrequencyLabel";

const BillingConfig = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    getFieldState,
    trigger,
    clearErrors,
    formState: { errors, isValid, touchedFields },
  } = useForm<BillingConfigSchema>({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const allValues = watch();
  const isCustomBillingCycles = allValues.duration === "Customize";
  const periodPaymentLabel = getPeriodFrequencyLabel(
    allValues.billingFrequency?.unit
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const syncPeriodPaymentWithInitialPrice = useCallback(
    debounce(() => {
      if (
        !getValues("periodPayment") &&
        !getFieldState("initialPrice").invalid
      ) {
        const newPeriodPayment = getValues("initialPrice") || 0;
        setValue("periodPayment", newPeriodPayment);
      }
    }, 500),
    []
  );

  const billingDescription = useMemo(() => {
    if (isValid) {
      return displayDescription(allValues);
    }

    return "";
  }, [allValues, isValid]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (touchedFields.initialPrice) {
        trigger();
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [trigger, touchedFields]);

  useEffect(() => {
    if (!isCustomBillingCycles) {
      clearErrors("billingCycles");
    }

    if (allValues.trialPeriod?.unit === "None") {
      clearErrors("trialPeriod.count");
    }
  }, [allValues.trialPeriod?.unit, clearErrors, isCustomBillingCycles]);

  const onSubmit: SubmitHandler<BillingConfigSchema> = () => {};

  return (
    <div className="p-8 m-4 flex flex-col flex-wrap border rounded-md">
      <div className="prose">
        <h1 className="text-primary">Set up your subscription</h1>
      </div>
      <form
        className="mt-8 flex flex-wrap sm:max-w-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-wrap sm:flex-nowrap">
          <Input
            touched={touchedFields.initialPrice}
            error={errors.initialPrice}
            className="w-[120px]"
            type="number"
            inputMode="numeric"
            label="Initial Price"
            {...register("initialPrice", {
              onChange: () => {
                syncPeriodPaymentWithInitialPrice();
              },
            })}
          />

          <div className="flex-col sm:ml-6">
            <Label label="Billing Frequency" />
            <div className="flex">
              <Input
                touched={touchedFields.billingFrequency?.count}
                error={errors.billingFrequency?.count}
                type="number"
                className="w-[80px]"
                {...register("billingFrequency.count")}
              />
              <Select
                touched={touchedFields.billingFrequency?.unit}
                error={errors.billingFrequency?.unit}
                className="ml-2 w-[120px]"
                {...register("billingFrequency.unit")}
              >
                <option>Days</option>
                <option>Weeks</option>
                <option>Months</option>
              </Select>
            </div>
          </div>

          <Input
            touched={touchedFields.periodPayment}
            error={errors.periodPayment}
            type="number"
            className="sm:ml-6 w-[140px]"
            label={periodPaymentLabel}
            {...register("periodPayment")}
          />
        </div>

        <div className="flex w-full flex-wrap ">
          <div className="flex-col">
            <div className="label">
              <span className="label-text">Trial Period</span>
            </div>
            <div className="flex">
              <Input
                disabled={
                  !allValues.trialPeriod ||
                  allValues.trialPeriod?.unit === "None"
                }
                touched={touchedFields.trialPeriod?.count}
                error={errors.trialPeriod?.count}
                type="number"
                className="w-[80px]"
                {...register("trialPeriod.count")}
              />
              <Select
                touched={touchedFields.trialPeriod?.count}
                error={errors.trialPeriod?.unit}
                className="ml-2 w-[120px]"
                {...register("trialPeriod.unit", {
                  onChange: (e) => {
                    if (e.target.value === "None") {
                      setValue("trialPeriod.count", undefined);
                    }
                  },
                })}
              >
                <option>None</option>
                <option>Days</option>
                <option>Weeks</option>
                <option>Months</option>
              </Select>
            </div>
          </div>

          <Select
            error={errors.duration}
            touched={touchedFields.duration}
            className="w-[140px] sm:ml-6"
            label="Duration"
            {...register("duration")}
          >
            <option>Never Ends</option>
            <option>Customize</option>
          </Select>

          {isCustomBillingCycles && (
            <Input
              touched={touchedFields.billingCycles}
              error={errors.billingCycles}
              className="w-[120px] ml-6"
              label="Billing Cycles"
              type="number"
              {...register("billingCycles")}
            />
          )}
        </div>

        <div className="flex mt-4 h-[150px] w-full">
          <TextArea readOnly value={billingDescription} />
        </div>
      </form>
    </div>
  );
};

export default BillingConfig;
