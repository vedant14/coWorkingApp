export function SuccessModal({ modal }) {
  if (modal === true) {
    return (
      <div className="fixed z-50 flex left-0 top-0 min-h-screen w-full bg-neutral-200/50">
        <div className="m-auto bg-dark-green px-10 py-10 rounded-md text-center max-w-xs space-y-2">
          <div>
            <img
              src="/icons/display/meeting-confirmed.svg"
              alt="meeting"
              className="mx-auto"
            />
          </div>
          <div>
            <p
              className="bg-primary-gradient bg-clip-text font-medium text-xl"
              style={{ webkitTextFillColor: "transparent" }}
            >
              Booking confirmed
            </p>
          </div>
          <div>
            <span className="text-neutral-50 text-sm">
              Confirmation has also been sent to the mail
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
