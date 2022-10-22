import { useState } from "react";
import timeSlots from "../../data/timeSlots.json";
import { Store } from "react-notifications-component";
export function SelectionField({
  i,
  day,
  userAvailability,
  setUserAvailability,
  inputRows,
  setInputRows,
}) {
  const [selectedStartInputField, setSelectedStartInputField] = useState(
    userAvailability[day.value]?.slots[i]?.startTime
  );
  const [selectedEndInputField, setSelectedEndInputField] = useState(
    userAvailability[day.value]?.slots[i]?.endTime
  );

  function updateStartSlotData(day, value, slotValue) {
    const modifiedDayValue = userAvailability;
    if (modifiedDayValue[day].slots[slotValue]) {
      if (parseInt(value) < modifiedDayValue[day].slots[slotValue].endTime) {
        modifiedDayValue[day].slots[slotValue].startTime = parseInt(value);
      } else {
        Store.addNotification({
          title: "Error!",
          message: "Start time cannot be more than or equal to end time",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    } else {
      modifiedDayValue[day].slots.push({
        startTime: parseInt(value),
        endTime: parseInt("2359"),
      });
    }
    setUserAvailability(modifiedDayValue);
    setSelectedStartInputField(
      modifiedDayValue[day].slots[slotValue].startTime
    );
  }
  function updateEndSlotData(day, value, slotValue) {
    const modifiedDayValue = userAvailability;
    if (modifiedDayValue[day].slots[slotValue]) {
      if (parseInt(value) > modifiedDayValue[day].slots[slotValue].startTime) {
        modifiedDayValue[day].slots[slotValue].endTime = parseInt(value);
      } else {
        Store.addNotification({
          title: "Error!",
          message: "End time cannot be less than or equal to start time",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
        });
      }
    } else {
      modifiedDayValue[day].slots.push({
        startTime: parseInt("0000"),
        endTime: parseInt(value),
      });
    }
    setUserAvailability(modifiedDayValue);
    setSelectedEndInputField(modifiedDayValue[day].slots[slotValue].endTime);
  }

  function removeInterval(day, slotValue) {
    if (inputRows !== 0) {
      setInputRows(inputRows - 1);
    }
    deleteSlotData(day, slotValue);
  }

  function deleteSlotData(day, slotValue) {
    const modifiedDayValue = userAvailability;
    if (modifiedDayValue[day].slots[slotValue]) {
      modifiedDayValue[day].slots.splice(slotValue, 1);
      setUserAvailability(modifiedDayValue);

      if (modifiedDayValue[day].slots[slotValue]) {
        setSelectedStartInputField(
          modifiedDayValue[day].slots[slotValue].startTime
        );
        setSelectedEndInputField(
          modifiedDayValue[day].slots[slotValue].endTime
        );
      } else {
        setSelectedStartInputField("0000");
        setSelectedEndInputField("0000");
      }
    }
  }
  return (
    <div className="my-3 flex w-1/2 justify-between items-center">
      <div>
        <label className="hidden">Start Time</label>
        <select
          id="startTime"
          name="start time"
          value={selectedStartInputField}
          className="mt-1 block bg-neutral-50 w-full h-10 px-3 border border-neutral-100 rounded shadow-sm focus:outline-none focus:dark-green focus:dark-green sm:text-sm"
          onChange={(e) => updateStartSlotData(day.value, e.target.value, i)}
        >
          {timeSlots.map((timeSlot, s) => (
            <option value={timeSlot.value} key={s}>
              {timeSlot.time}
            </option>
          ))}
        </select>
      </div>
      <div>-</div>
      <div>
        <label className="hidden">End Time</label>
        <select
          id="endTime"
          name="End time"
          value={selectedEndInputField}
          className="mt-1 block bg-neutral-50 w-full h-10 px-3 border border-neutral-100 rounded shadow-sm focus:outline-none focus:dark-green focus:dark-green sm:text-sm"
          onChange={(e) => updateEndSlotData(day.value, e.target.value, i)}
        >
          {timeSlots.map((timeSlot, s) => (
            <option value={timeSlot.value} key={s}>
              {timeSlot.time}
            </option>
          ))}
        </select>
      </div>
      <button onClick={() => removeInterval(day.value, i)}>
        <img src="/icons/display/delete.svg" alt="Delete" />
      </button>
    </div>
  );
}
