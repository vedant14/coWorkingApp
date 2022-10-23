import { useState, useEffect } from "react";
import Link from "next/link";
import { getInitials, classNames } from "../../utils/helperFunctions";
import { useAuth } from "../../context/AuthContext";
import colors from "../../data/bgColors.json";
import { getUserLocationData } from "../../utils/firebaseGetRequests";
export function LocationList({ brandId }) {
  const [locationData, SetLocationData] = useState([]);
  const { uniqueId } = useAuth();
  useEffect(() => {
    if (uniqueId && brandId) {
      getUserLocationData(uniqueId, brandId, locationData, SetLocationData);
    }
  }, [uniqueId]);

  return (
    <div className="mb-5">
      <div className="bg-white pb-5">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          All Locations
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          All the users of this brand - these do not include location users
        </p>
      </div>
      {locationData && (
        <ul
          role="list"
          className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {locationData.map((item, i) => (
            <Link key={i} href={`/brands/${brandId}/${item.id}`} passHref>
              <li className="col-span-1 flex shadow-sm rounded-md cursor-pointer">
                <div
                  className={classNames(
                    colors[Math.floor(Math.random() * colors.length)],
                    "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                  )}
                >
                  {getInitials(item.name)}
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate text-gray-900 font-medium hover:text-gray-600">
                    {item.name}
                    <p className="text-gray-500"> Members</p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
