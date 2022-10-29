import { LocationMarkerIcon, UsersIcon } from "@heroicons/react/solid";
import Link from "next/link";
export function LocationList({ brandId, locationData }) {
  if (!locationData) {
    return null;
  } else if (locationData.length === 0) {
    return <NoLocationCard />;
  } else return <LocationDetailCard />;

  function LocationDetailCard() {
    return (
      <>
        {locationData.map((item, i) => (
          <li key={i}>
            <Link href={`/brands/${brandId}/${item.id}`} passHref>
              <a className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-neutral-700 truncate">
                      {item.name}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Open
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <UsersIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Manager
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <LocationMarkerIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        position.location
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </>
    );
  }
  function NoLocationCard() {
    return (
      <li>
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-600 truncate">
              No locations yet for this brand{" "}
              <Link href={`/brands/${brandId}/new-location`}>
                <a className="text-dark-green text-bold underline">Add one</a>
              </Link>
            </p>
          </div>
        </div>
      </li>
    );
  }
}
