import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { CheckoutForm, PageLoader } from "../../../components";
import { getPublicBrandData } from "../../../utils/supabaseGetRequests";
import { BookingContainer } from "../../../components/atoms/bookingContainer";
export default function ConfirmPage() {
  const router = useRouter();
  const { booking } = router.query;
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    if (booking) {
      getPublicBrandData(booking, function (fetchedData) {
        setBookingData(fetchedData);
      });
    }
  }, [booking]);
  if (bookingData === false) {
    return null;
  } else if (!bookingData) {
    return null;
  } else {
    return <ShowConfirmPage />;
  }
  function ShowConfirmPage() {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div>
          <div className="h-4 bg-amber-300">&nbsp;</div>
          <BookingContainer>
            <div className="py-10 px-5">
              <div className="inline-flex items-center text-xl font-medium">
                <Link href={`/book/${booking}`}>
                  <ArrowLeftIcon className="h-6 cursor-pointer" />
                </Link>
                <span className="ml-2">Confirm your seat</span>
              </div>
              <CheckoutForm bookingData={bookingData} />
            </div>
          </BookingContainer>
        </div>
      </div>
    );
  }
}
