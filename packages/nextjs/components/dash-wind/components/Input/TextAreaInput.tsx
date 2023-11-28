import { useState } from "react";

interface props {
  labelTitle?: string;
  labelStyle?: string;
  // type: ;
  containerStyle?: string;
  defaultValue?: string;
  placeholder?: string;
  updateFormValue: ({ updateType, value }: { updateType: any; value: any }) => void;
  updateType?: string;
}

function TextAreaInput({
  labelTitle,
  labelStyle,
  // type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}: props) {
  const [value, setValue] = useState(defaultValue);

  function updateInputValue(val: string) {
    setValue(val);
    updateFormValue({ updateType, value: val });
  }

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
      </label>
      <textarea
        value={value}
        className="textarea textarea-bordered w-full"
        placeholder={placeholder || ""}
        onChange={e => updateInputValue(e.target.value)}
      ></textarea>
    </div>
  );
}

export default TextAreaInput;
