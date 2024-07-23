import { forwardRef, SelectHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import Label from "./Label";
import clsx from "clsx";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  touched?: boolean;
  label?: string;
  error?: FieldError;
}
const Select: React.FC<SelectProps> = forwardRef(function Select(
  { className, error, touched, label, ...props },
  ref: React.Ref<HTMLSelectElement>
) {
  return (
    <Label className={className} label={label}>
      <select
        ref={ref}
        className={clsx("select select-bordered w-full", {
          "select-success": touched && !error,
        })}
        {...props}
      ></select>
      <div className="label">
        <span className="label-text-alt text-error whitespace-nowrap">
          {error?.message}
        </span>
      </div>
    </Label>
  );
});

export default Select;
