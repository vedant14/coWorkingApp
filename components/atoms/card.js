export function Card({ children }) {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg sm:rounded-lg my-4">
      <div>{children}</div>
    </div>
  );
}
