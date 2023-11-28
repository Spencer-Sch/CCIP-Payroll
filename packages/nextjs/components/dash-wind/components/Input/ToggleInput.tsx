// NOTE: Original file was names "ToogleInput"
import { useState } from "react";

interface props {
  labelTitle?: string;
  labelStyle?: string;
  // type: ;
  containerStyle?: string;
  defaultValue?: boolean;
  // placeholder: ;
  placeholder?: string;
  updateFormValue: ({ updateType, value }: { updateType: any; value: any }) => void;
  updateType?: string;
}

function ToggleInput({
  labelTitle,
  labelStyle,
  //   type,
  containerStyle,
  defaultValue,
  //   placeholder,
  updateFormValue,
  updateType,
}: props) {
  const [value, setValue] = useState(defaultValue);

  const updateToggleValue = () => {
    setValue(!value);
    updateFormValue({ updateType, value: !value });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label cursor-pointer">
        <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
        <input type="checkbox" className="toggle" checked={value} onChange={() => updateToggleValue()} />
        {/* <input type="checkbox" className="toggle" checked={value} onChange={e => updateToggleValue()} /> */}
      </label>
    </div>
  );
}

export default ToggleInput;
