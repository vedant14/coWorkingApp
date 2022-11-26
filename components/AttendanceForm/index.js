import { useState } from "react";
import { InputText } from "../atoms/inputText";
import { Card } from "../atoms/card";
import { toastNotification } from "../atoms/toastNotification";
import { getBookingFromSearch } from "../../utils/supabaseGetRequests";
import { BookingsLayout } from "../BookingsLayout";

export function AttendanceForm() {
  const [phone, setPhone] = useState("");
  const [showBookings, setShowBookings] = useState(null);
  function searchBooking(e) {
    e.preventDefault();
    if (phone) {
      getBookingFromSearch(phone, function (response) {
        if (response.length > 0) {
          setShowBookings(response);
        }
      });
    } else {
      toastNotification(
        "Please enter search",
        "We need number or email ",
        "danger"
      );
    }
  }
  return (
    <div>
      <Card>
        <div className="p-6 mb-4">
          <div className="flex">
            <InputText
              label="Phone Number Or Email"
              value={phone}
              onChangeValue={setPhone}
              placeholder="Search using phone or email"
              actionText="Search"
              action={searchBooking}
            />
          </div>
        </div>
      </Card>

      {showBookings && (
        <div className="mt-8">
          <BookingsLayout bookingData={showBookings} />
        </div>
      )}
    </div>
  );
}
