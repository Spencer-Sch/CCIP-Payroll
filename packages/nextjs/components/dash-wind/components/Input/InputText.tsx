import { useState } from "react";

// import { LEAD_OBJ, LOGIN_OBJ, REGISTER_OBJ, USER_OBJ } from "../../Types/InputTextTypes";

// type InputValues = string | REGISTER_OBJ | LOGIN_OBJ | USER_OBJ | LEAD_OBJ;

interface props {
  labelTitle?: string;
  labelStyle?: string;
  type?: string;
  containerStyle?: string;
  defaultValue?: string;
  placeholder?: string;
  updateFormValue?: ({ updateType, value }: { updateType: any; value: any }) => void;
  updateType?: string;
}

function InputText({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}: props) {
  const [value, setValue] = useState(defaultValue);

  function updateInputValue(val: string) {
    setValue(val);
    updateFormValue?.({ updateType, value: val });
  }

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
      </label>
      <input
        type={type || "text"}
        value={value}
        placeholder={placeholder || ""}
        onChange={e => updateInputValue(e.target.value)}
        className="input  input-bordered w-full "
      />
    </div>
  );
}

export default InputText;
