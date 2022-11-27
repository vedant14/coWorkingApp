import { useAuth } from "../../context/AuthContext";
import { postNewEntry } from "../../utils/supabasePostRequests";
import { Card } from "../atoms/card";
import { toastNotification } from "../atoms/toastNotification";
export function EntryModal({
  headerText,
  subText,
  primaryActionText,
  modalOpen,
  setModalOpen,
  brandData,
}) {
  const { currentUser } = useAuth();
  if (modalOpen === false) {
    return null;
  } else return <ShowModal />;
  function addNewEntry() {
    const data = {
      bookingId: brandData.id,
      locationId: brandData.location_id,
      seatCount: 2,
    };
    postNewEntry(data, currentUser.id, function (response) {
      toastNotification("Entry added", "Done", "success");
      setModalOpen(false);
    });
  }

  function ShowModal() {
    return (
      <div className="min-h-full min-w-full absolute bg-neutral-500/60 top-0 left-0 z-20">
        <div className="w-1/3 h-fit m-auto mt-40">
          <Card>
            <div className="my-6">
              <div className="text-md bold neutral-700 border-b px-6 pb-4">
                {headerText}
              </div>
              <div className="mt-2 px-6">
                <p className="text-sm text-gray-500">{subText}</p>
              </div>

              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 py-5 sm:grid-cols-2">
                <div className="sm:col-span-1 px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Booking name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {brandData.booking_name}
                  </dd>
                </div>
                <div className="sm:col-span-1 px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Booking name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {brandData.brands.name}
                  </dd>
                </div>
                <div className="sm:col-span-1 px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Booking Phone
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {brandData.booking_phone}
                  </dd>
                </div>
                <div className="sm:col-span-1 px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Booking Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {brandData.booking_email}
                  </dd>
                </div>
                <div className="sm:col-span-1 px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Total Seat Count
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {brandData.seat_count}
                  </dd>
                </div>
                <div className="sm:col-span-1 px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Remaining Days
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {brandData.booking_email}
                  </dd>
                </div>
              </dl>

              <div className="border-b border-t">
                <div className="py-4 px-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div>Booking for seats</div>
                  <div>2</div>
                </div>
              </div>

              <div className="px-4 mt-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-dark-green px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-dark-green focus:outline-none focus:dark-green focus:ring-dark-green focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => addNewEntry()}
                >
                  {primaryActionText}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
