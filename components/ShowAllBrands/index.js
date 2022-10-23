import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAdminBrandData } from "../../utils/firebaseGetRequests";
import { BrandCard } from "./brandCard";
import { LocationCard } from "./locationCard";

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
        <>
          {brandData.map((item, i) => (
            <div key={i} className="mb-10">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  <BrandCard item={item} />
                  <LocationCard brandId={item.id} uniqueId={uniqueId} />
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
