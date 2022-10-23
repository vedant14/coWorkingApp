const colors = [
  "bg-pink-600",
  "bg-purple-600",
  "bg-yellow-500",
  "bg-green-500",
];

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { getAdminBrandData } from "../../utils/firebaseGetRequest";
import { classNames, getInitials } from "../../utils/helperFunctions";

export function ShowAllBrands() {
  const [brandData, setBrandData] = useState([]);
  const { uniqueId } = useAuth();
  useEffect(() => {
    if (uniqueId) {
      getAdminBrandData(uniqueId, brandData, setBrandData);
    }
  }, [uniqueId]);

  return (
    <div>
      {brandData && (
        <ul
          role="list"
          className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {brandData.map((item, i) => (
            <Link key={i} href={`/brands/${item.id}`} passHref>
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
