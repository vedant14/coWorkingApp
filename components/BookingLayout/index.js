export function BookingLayout({ children }) {
  return (
    <div className="bg-white relative min-h-screen mb-48">
      <div className="absolute top-0 z-10 bg-neutral-100 w-full py-48 bg-[url('/vectors/background-shape.svg')] bg-cover bg-center ">
        &nbsp;
      </div>
      <div className="absolute z-20 w-full top-24">
        <div className="container mx-auto px-6 ">
          <div className="bg-white w-full p-6 rounded-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
