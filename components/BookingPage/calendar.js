import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { classNames } from "../../utils/helperFunctions";
export default function CalendarComponent({
  slotData,
  getNextDates,
  getPastDates,
  selectedDateSlot,
  selectedDate,
  showCalendar,
}) {
  var localSlotData = slotData;
  var firstDate = slotData[0];

  useEffect(() => {
    localSlotData = slotData;
    firstDate = slotData[0];
  }, [slotData]);

  for (let i = firstDate.day; i > 0; i--) {
    localSlotData.unshift({
      date: new Date(),
      isEmpty: true,
    });
  }
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (showCalendar === false) {
    return null;
  }
  return (
    <div className="md:pr-14">
      <div className="flex items-center">
        <h2 className="flex-auto font-semibold text-gray-900">
          {month[firstDate.date.getMonth()]} {firstDate.date.getFullYear()}
        </h2>
        <button
          type="button"
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={() => getPastDates()}
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
          onClick={() => getNextDates()}
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div className="mt-2 grid grid-cols-7 text-sm">
        {localSlotData.map((day, dayIdx) => (
          <div key={dayIdx} className="">
            {day.date && day.slots && (
              <button
                type="button"
                className={classNames(
                  day.slots.length === 0 && "text-slate-700",
                  day.date.getDate() === selectedDate?.getDate() &&
                    day.date.getMonth() === selectedDate?.getMonth() &&
                    day.date.getFullYear() === selectedDate?.getFullYear()
                    ? "bg-dark-green text-white border-dark-green"
                    : "text-black",
                  day.date.getDay() === 6 && "border-r",
                  dayIdx === localSlotData.length - 1 && "border-r",
                  dayIdx >= localSlotData.length - 7 && "border-b",
                  "border-t border-l border-neutral-300 mx-auto flex h-10 w-full items-center justify-center"
                )}
                disabled={day.slots.length === 0 && true}
                onClick={() => selectedDateSlot(day)}
              >
                <time
                  dateTime={day.date}
                  className={classNames(day.slots.length === 0 && "opacity-30")}
                >
                  {day.isEmpty === true ? "" : day.date.getDate()}
                </time>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
