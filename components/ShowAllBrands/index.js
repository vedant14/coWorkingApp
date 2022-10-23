import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAdminBrandData } from "../../utils/firebaseGetRequests";
import { LocationList } from "../LocationList";
import { BrandCard } from "./brandCard";

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
                  <LocationList brandId={item.id} />
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
