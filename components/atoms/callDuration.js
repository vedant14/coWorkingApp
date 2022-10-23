import { useState } from "react";
import { InputText } from "./inputText";
import { classNames } from "../../utils/helperFunctions";
export function CallDuration({ id, label, value, onChangeValue, custom }) {
  const callDurationArray = [
    { name: "10min", value: "10" },
    { name: "30min", value: "30" },
    { name: "45min", value: "45" },
    { name: "60min", value: "100" },
    { name: "Add custom time", value: "custom" },
  ];

  const [show, setShow] = useState(false);

  function buttonValue(e, value) {
    e.preventDefault();
    if (value === "custom") {
      setShow(true);
    } else onChangeValue(value);
  }
  if (show === false && custom === false) {
    return inputPill();
  } else
    return (
      <div>
        <InputText
          id={id}
          label={label}
          type="number"
          placeholder="Add in minutes"
          value={value}
          onChangeValue={onChangeValue}
        />
      </div>
    );

  function inputPill() {
    return (
      <div className="py-2">
        <label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          {label}
        </label>
        <div id={id}>
          {callDurationArray.map((item, i) => (
            <button
              key={i}
              className={classNames(
                item.value === value
                  ? "border-white-600 bg-indigo-700 text-white"
                  : "border-indigo-600 text-indigo-600 bg-white",
                "inline-flex items-center px-3 mr-3 mt-2 py-2 border  text-sm leading-4 font-medium rounded-md shadow-sm   hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
              onClick={(e) => {
                buttonValue(e, item.value);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
