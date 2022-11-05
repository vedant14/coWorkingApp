import { useEffect, useState } from "react";
import {
  BookingsLayout,
  NoDataPage,
  PageHeading,
  PageLoader,
  PrivateLayout,
} from "../../components";
import { useAuth } from "../../context/AuthContext";
import { getAllBookings } from "../../utils/supabaseGetRequests";

export default function Bookings() {
  const [bookingData, setBookingData] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      getAllBookings(currentUser.id, function (data) {
        setBookingData(data);
      });
    }
  }, [currentUser]);

  if (bookingData === false) {
    return <NoDataPage />;
  } else if (!bookingData) {
    return <PageLoader />;
  } else {
    return <BookingsPage />;
  }

  function BookingsPage() {
    return (
      <PrivateLayout>
        <PageHeading
          name="Bookings"
          primaryLink="/bookings/offline-booking"
          primaryText="Offline Booking"
        />
        <BookingsLayout bookingData={bookingData} />
      </PrivateLayout>
    );
  }
}
