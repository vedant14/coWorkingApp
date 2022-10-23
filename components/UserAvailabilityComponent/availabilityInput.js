import { useState, useEffect } from "react";
import { SelectionField } from "./selectionField";
import { classNames } from "../../utils/helperFunctions";
export function AvailabilityInput({
  day,
  userAvailability,
  setUserAvailability,
}) {
  const [inputRows, setInputRows] = useState(0);
  useEffect(() => {
    setInputRows(userAvailability[day.value].slots.length);
  }, [userAvailability]);
  function addInterval() {
    setInputRows(inputRows + 1);
  }

  var rows = [...Array(inputRows).keys()];
  return (
    <div>
      <div className="flex w-full my-3 justify-between items-center">
        <p className={classNames(rows.length === 0 && "opacity-30")}>
          {day.name}
        </p>
        <button onClick={addInterval}>
          <img src="/icons/display/plus.svg" alt="add" />
        </button>
      </div>
      {rows.map((i) => (
        <SelectionField
          key={i}
          i={i}
          day={day}
          userAvailability={userAvailability}
          setUserAvailability={setUserAvailability}
          inputRows={inputRows}
          setInputRows={setInputRows}
        />
      ))}
    </div>
  );
}
