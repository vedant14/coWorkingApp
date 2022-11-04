import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
// import {
//   getTodayUserBookings,
//   getUpcomingUserBookings,
// } from "../../utils/firebaseGetRequests";
import { displayDate, displaySlotData } from "../../utils/helperFunctions";

export function UpcomingBookings({ today }) {
  const [bookingData, setBookingData] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (today === true) {
      // getTodayUserBookings(currentUser.id, setBookingData);
    } else {
      // getUpcomingUserBookings(currentUser.id, setBookingData);
    }
  }, [currentUser]);

  function HandleBookingData() {
    if (bookingData === null || bookingData.length === 0) {
      return <NoBookingData />;
    } else {
      return <ShowBookingData />;
    }
  }

  function ShowBookingData() {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-12">
        {bookingData.map((booking, i) => (
          <div
            key={i}
            className="border-neutral-200 border px-4 py-6 shadow-md rounded"
          >
            <div className="bg-light-green rounded w-fit py-1 px-2 text-neutral-400">
              Mock Interview
            </div>
            <div className="text-neutral-400 my-2">
              {today !== true && <>{displayDate(booking.date.toDate())} - </>}
              {displaySlotData(booking.time)}
            </div>
            <div className="text-dark-green font-medium">{booking.name}</div>
            <div className="my-2">
              <hr className="border-neutral-100" />
            </div>
            <div className="mt-4 flex text-xs font-medium items-center justify-between gap-1">
              <button className="flex no-wrap items-center bg-dark-green text-light-green rounded space-x-1 py-2 px-3">
                <div>
                  <img
                    className="shrink-0"
                    src="/icons/display/video.svg"
                    alt="video"
                  />
                </div>
                <div>Join Call</div>
              </button>
              <button className="flex items-center text-dark-green border border-dark-green rounded space-x-1 py-2 px-3">
                <div>
                  <img
                    className="shrink-0"
                    src="/icons/display/video-dark.svg"
                    alt="video"
                  />
                </div>
                <div>Reschedule</div>
              </button>
              <button className="flex items-center text-pastel-red border border-pastel-red rounded space-x-1 py-2 px-3">
                <div>
                  <img
                    className="shrink-0"
                    src="/icons/display/video-cancel.svg"
                    alt="video"
                  />
                </div>
                <div>Cancel</div>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function NoBookingData() {
    return (
      <div>
        <div className="m-auto text-center">
          <img
            src="/icons/display/calendar.svg"
            alt="Calendar"
            className="mt-40 mx-auto w-20"
          />
          <p className="mt-4 text-xl">
            {today === true ? (
              <> No bookings today</>
            ) : (
              <>No upcoming bookings</>
            )}
          </p>
          <p className="mt-2 text-neutral-400">
            Let’s share the links to your Profile
          </p>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_URL}/book/${currentUser.slug}`}
            target="_blank"
            className="mt-4 mx-auto w-fit bg-neutral-100 flex justify-between py-2.5 px-4 rounded-md"
          >
            Share on Linkedin
            <img
              src="/icons/social/linkedIn.svg"
              className="flex-shrink-0 ml-2 h-6 w-6"
            />
          </a>
        </div>
      </div>
    );
  }

  function ShowTodaysDate() {
    if (today === true) {
      return `Today’s Bookings - ${displayDate(new Date())}`;
    } else {
      return "Upcoming Bookings";
    }
  }

  return (
    <div>
      <p className="text-2xl text-dark-green font-semibold">
        <ShowTodaysDate />
      </p>
      <HandleBookingData />
    </div>
  );
}
