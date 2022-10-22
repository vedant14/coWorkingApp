import { useState, useEffect } from "react";
import CalendarComponent from "./calendar";
import SlotSelection from "./slotSelection";
import BookingForm from "./bookingForm";
import { getSlotDetails } from "../../utils/firebasePublicDataRequests";

export function BookingPage({ mentorData }) {
  const [slotData, setSlotData] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showBookingSlots, setShowBookingSlots] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    setFromDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  }, []);

  useEffect(() => {
    if (mentorData && fromDate) {
      getSlotDetails(mentorData[0].id, fromDate, setSlotData);
    }
  }, [fromDate, mentorData]);

  function getNextDates() {
    setFromDate(new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 1));
    getSlotDetails(mentorData[0].id, fromDate, setSlotData);
  }

  function getPastDates() {
    setFromDate(new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, 1));
    getSlotDetails(mentorData[0].id, fromDate, setSlotData);
  }

  function selectedDateSlot(value) {
    const slotsArray = value.slots;
    setSelectedTime(null);
    setSelectedDate(value.date);
    setShowBookingSlots(true);
    setShowBookingForm(false);
    if (slotsArray.length > 0) {
      setSelectedSlots(slotsArray);
    } else {
      setSelectedSlots(null);
    }
  }

  return (
    <div className="mt-10 md:grid md:grid-cols-2 space-y-6">
      {slotData && (
        <>
          <CalendarComponent
            slotData={slotData}
            fromDate={fromDate}
            getNextDates={getNextDates}
            showCalendar={showCalendar}
            getPastDates={getPastDates}
            selectedDateSlot={selectedDateSlot}
            selectedDate={selectedDate}
          />
          <SlotSelection
            selectedDate={selectedDate}
            selectedSlots={selectedSlots}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            setShowCalendar={setShowCalendar}
            showBookingSlots={showBookingSlots}
            setShowBookingSlots={setShowBookingSlots}
            setShowBookingForm={setShowBookingForm}
          />
          <BookingForm
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            showBookingForm={showBookingForm}
            setShowCalendar={setShowCalendar}
            setShowBookingSlots={setShowBookingSlots}
            setShowBookingForm={setShowBookingForm}
            mentorData={mentorData[0]}
          />
        </>
      )}
    </div>
  );
}
