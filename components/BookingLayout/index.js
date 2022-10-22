import { MaxContainer } from "../atoms/maxContainer";

export function BookingLayout({ children }) {
  return (
    <div className="bg-white-700 relative min-h-screen mb-56">
      <div className="absolute top-0 z-10 bg-neutral-100 w-full py-32 bg-[url('/vectors/background-shape.svg')] bg-cover bg-center ">
        &nbsp;
      </div>
      <div className="absolute z-20 w-full top-28">
        <MaxContainer>
          <div className="bg-white w-full p-10 rounded-md shadow-sm">
            {children}
          </div>
        </MaxContainer>
      </div>
    </div>
  );
}
