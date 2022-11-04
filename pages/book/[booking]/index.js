import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BookingLayout, BrandShowCase, PageLoader } from "../../../components";
import { getPublicBrandData } from "../../../utils/supabaseGetRequests";
export default function MentorPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { booking } = router.query;
  useEffect(() => {
    if (booking) {
      getPublicBrandData(booking, function (fetchedData) {
        setBookingData(fetchedData);
      });
    }
  }, [booking]);

  if (bookingData === false) {
    return <NoBookingsPage />;
  } else if (!bookingData) {
    return <PageLoader />;
  } else {
    return <DoBookingPage />;
  }

  function NoBookingsPage() {
    return (
      <BookingLayout>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-4 text-dark-green">
            <p className="font-semibold text-3xl mb-2">404</p>
            <p>Uh ho, we could not find the page you were looking for</p>
            <button className="w-fit mt-4 py-3 px-4 rounded-md bg-dark-green shadow-sm text-white text-base font-medium inline-flex items-center space-x-4">
              Find more mentors
            </button>
          </div>
        </div>
      </BookingLayout>
    );
  }

  function DoBookingPage() {
    return <BrandShowCase slug={booking} bookingData={bookingData} />;
  }
}
