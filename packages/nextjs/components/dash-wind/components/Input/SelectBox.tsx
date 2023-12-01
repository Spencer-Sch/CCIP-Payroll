import React, { useState } from "react";
// import axios from "axios";
// import capitalize from "capitalize-the-first-letter";
import InformationCircleIcon from "@heroicons/react/24/outline/InformationCircleIcon";

interface props {
  labelTitle: string;
  labelDescription: string;
  defaultValue: string;
  containerStyle: string;
  placeholder: string;
  labelStyle: string;
  options: { name: string; value: string }[];
  updateType: string;
  updateFormValue: ({ updateType, value }: { updateType: any; value: any }) => void;
}

function SelectBox({
  labelTitle,
  labelDescription,
  defaultValue,
  containerStyle,
  placeholder,
  labelStyle,
  options,
  updateType,
  updateFormValue,
}: props) {
  //   const {
  //     labelTitle,
  //     labelDescription,
  //     defaultValue,
  //     containerStyle,
  //     placeholder,
  //     labelStyle,
  //     options,
  //     updateType,
  //     updateFormValue,
  //   } = props;

  const [value, setValue] = useState(defaultValue || "");

  function updateValue(newValue: string) {
    updateFormValue({ updateType, value: newValue });
    setValue(newValue);
  }

  return (
    <div className={`inline-block ${containerStyle}`}>
      <label className={`label  ${labelStyle}`}>
        <div className="label-text">
          {labelTitle}
          {labelDescription && (
            <div className="tooltip tooltip-right" data-tip={labelDescription}>
              <InformationCircleIcon className="w-4 h-4" />
            </div>
          )}
        </div>
      </label>

      <select className="select select-bordered w-full" value={value} onChange={e => updateValue(e.target.value)}>
        <option disabled value="PLACEHOLDER">
          {placeholder}
        </option>
        {options.map((o, k) => {
          return (
            <option value={o.value || o.name} key={k}>
              {o.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectBox;
