import { InputHTMLAttributes } from "react";

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {}
const TextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <textarea
      className="textarea textarea-bordered w-full"
      {...props}
    ></textarea>
  );
};
export default TextArea;
