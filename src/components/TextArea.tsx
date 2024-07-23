import { InputHTMLAttributes } from "react";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {}
const TextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <textarea
      className="textarea textarea-bordered border-primary textarea-primary text-lg w-full"
      {...props}
    ></textarea>
  );
};
export default TextArea;
