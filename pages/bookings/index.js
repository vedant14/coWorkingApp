import { useEffect, useState } from "react";
import {
  BookingsLayout,
  PageHeading,
  PageLoader,
  PrivateLayout,
} from "../../components";
import { useAuth } from "../../context/AuthContext";

export default function Bookings() {
  const [bookingData, setBookingData] = useState(null);
  const { currentUser } = useAuth();

  useEffect(
    () => ({
      if(currentUser) {
        getAllBookings(currentUser, function (data) {
          setBookingData(data);
        });
      },
    }),
    [currentUser]
  );

  if (bookingData === false) {
    return <NoBookings />;
  } else if (!bookingData) {
    return <PageLoader />;
  } else {
    return <BookingsPage />;
  }

  function NoBookings() {
    return <div>No Bookings</div>;
  }
  function BookingsPage() {
    return (
      <PrivateLayout>
        <PageHeading
          name="Bookings"
          primaryLink="/bookings/offline-booking"
          primaryText="Offline Booking"
        />
        <BookingsLayout />
      </PrivateLayout>
    );
  }
}
