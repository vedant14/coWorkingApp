import { displayDate, displaySlotData } from "../../utils/helperFunctions";
import { classNames } from "../../utils/helperFunctions";
export default function SlotSelection({
  selectedDate,
  selectedSlots,
  selectedTime,
  setSelectedTime,
  showBookingSlots,
  setShowCalendar,
  setShowBookingSlots,
  setShowBookingForm,
}) {
  if (showBookingSlots == false) {
    return null;
  } else if (selectedDate && !selectedSlots) {
    return <NoSlotsAvailable />;
  }

  function callTimeSelected(value) {
    setSelectedTime(value);
  }

  function callShowBookingForm() {
    setShowCalendar(false);
    setShowBookingSlots(false);
    setShowBookingForm(true);
  }
  function NoSlotsAvailable() {
    return (
      <div className="h-full flex">
        <div className="m-auto">
          <p className="text-xl text-dark-green max-w-xs text-center">
            No slots available for the selected date
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-neutral-600">{displayDate(selectedDate)}</div>
      <div className="max-h-80 overflow-scroll">
        {selectedSlots.map((data, i) => (
          <div key={i} className="grid grid-cols-2 gap-x-4 my-2">
            <button
              className={classNames(
                selectedTime === data
                  ? "bg-neutral-100 border-neutral-100 text-dark-green"
                  : "bg-white border-neutral-200 text-neutral-400 col-span-2",
                "border rounded w-full p-2"
              )}
              onClick={() => callTimeSelected(data)}
            >
              {displaySlotData(data)}
            </button>
            <div>
              <button
                className={classNames(
                  selectedTime === data ? "block" : "hidden",
                  "bg-dark-green text-white rounded w-full p-2 border border-dark-green"
                )}
                onClick={callShowBookingForm}
              >
                Confirm
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
