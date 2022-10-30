import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAdminBrandData } from "../../utils/supabaseGetRequests";
import { BrandCard } from "./brandCard";

export function ShowAllBrands() {
  const [brandData, setBrandData] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      getAdminBrandData(currentUser.id, function (fetchedBrandData) {
        setBrandData(fetchedBrandData);
      });
    }
  }, [currentUser]);
  return (
    <div>
      {brandData && (
        <>
          {brandData.map((item, i) => (
            <div key={i} className="mb-10">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  <BrandCard item={item} />
                </ul>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
