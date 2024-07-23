import { forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { FieldError } from "react-hook-form";
import Label from "./Label";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  touched?: boolean;
  label?: string;
  error?: FieldError;
}
const Input: React.FC<InputProps> = forwardRef(function Input(
  { className, label, error, touched, ...props },
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <Label className={className} label={label}>
      <input
        className={clsx("input input-bordered w-full", {
          "input-error": error,
          "no-arrows": props.type === "number",
          "input-success": touched && !error,
        })}
        ref={ref}
        {...props}
      />
      <div className="label">
        <span className="label-text-alt text-error whitespace-nowrap">
          {error?.message}
        </span>
      </div>
    </Label>
  );
});

export default Input;
