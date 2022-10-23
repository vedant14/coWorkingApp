import Link from "next/link";

export function NoDataPage() {
  return (
    <PrivateLayout>
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-4 text-dark-green">
          <p className="font-semibold text-3xl mb-2">404</p>
          <p>Uh ho, we could not find the page you were looking for</p>
          <Link href="/dashboard">
            <button className="w-fit mt-4 py-3 px-4 rounded-md bg-dark-green shadow-sm text-white text-base font-medium inline-flex items-center space-x-4">
              Go back to dashboard
            </button>
          </Link>
        </div>
      </div>
    </PrivateLayout>
  );
}
