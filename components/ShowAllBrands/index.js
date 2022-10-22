import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { getAdminBrandData } from "../../utils/firebaseGetRequest";
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
      <div className="h1">All your brands</div>
      {brandData && (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {brandData.map((item, i) => (
            <li
              key={i}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="w-full flex items-center justify-between p-6 space-x-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-gray-900 text-sm font-medium truncate">
                      {item.brandName}
                    </h3>
                    <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      LIVE
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="-ml-px w-0 flex-1 flex">
                    <Link href={`/brands/${item.id}`} passHref>
                      <div className="relative w-0 cursor-pointer flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                        <span className="ml-3">View Brand</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
