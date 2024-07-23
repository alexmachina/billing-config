import clsx from "clsx";

interface LabelProps {
  className?: string;
  label?: string;
  children?: React.ReactNode;
}
const Label: React.FC<LabelProps> = ({ label, className, children }) => {
  return (
    <label className={clsx(className, "form-control")}>
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      {children}
    </label>
  );
};

export default Label;
