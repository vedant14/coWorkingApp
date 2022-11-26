import { useAuth } from "../../context/AuthContext";
import { Card } from "./card";
export function CustomModal({
  headerText,
  subText,
  primaryActionText,
  modalOpen,
  setModalOpen,
}) {
  if (modalOpen === false) {
    return null;
  } else return <ShowModal />;

  function ShowModal() {
    return (
      <div className="min-h-full min-w-full absolute bg-neutral-500/60 top-0 left-0 z-20">
        <div className="w-1/3 h-fit m-auto mt-60">
          <Card>
            <div className="my-6">
              <div className="text-md bold neutral-700 border-b px-6 pb-4">
                {headerText}
              </div>
              <div className="mt-2 px-6">
                <p className="text-sm text-gray-500">{subText}</p>
              </div>
              <div className="px-4 mt-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-dark-green px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-dark-green focus:outline-none focus:dark-green focus:ring-dark-green focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  // onClick={() => setOpen(false)}
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
