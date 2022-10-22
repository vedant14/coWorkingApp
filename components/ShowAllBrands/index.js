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
        <div>
          {brandData.map((item, i) => (
            <div key={i}>
              <Link href={`/brands/${item.id}`}>{item.brandName}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
