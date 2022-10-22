export function ServiceList({ mentorData, setCurrentStep }) {
  return (
    <div className="mt-10">
      {mentorData[0].mentorServices && (
        <div>
          <p className="text-base neutral-600">Available for</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
            {mentorData[0].mentorServices.map((item, i) => (
              <div
                key={i}
                className="rounded-md bg-neutral-50 border-neutral-100 border-2 px-4 py-4 text-neutral-700 font-semi-bold text-center"
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {mentorData[0].amount && (
        <div className="mt-6">
          <button
            className="w-fit py-3 px-4 rounded-md bg-dark-green shadow-sm text-white text-base font-medium inline-flex items-center space-x-4"
            onClick={() => setCurrentStep(1)}
          >
            <p>Book Slot Now</p>
            <img src="/icons/display/arrow-right.svg" alt="arrow" />
          </button>
        </div>
      )}
    </div>
  );
}
