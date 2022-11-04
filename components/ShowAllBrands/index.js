import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAdminBrandData } from "../../utils/supabaseGetRequests";
import { BrandCard } from "./brandCard";
import { PlusIcon } from "@heroicons/react/solid";
import { Card } from "../atoms/card";

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
  if (brandData === false) {
    return <NoBrands />;
  } else if (!brandData) {
    return <PageLoader />;
  } else {
    return <BrandLists />;
  }

  function NoBrands() {
    return (
      <Card>
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No projects
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new project.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Project
            </button>
          </div>
        </div>
      </Card>
    );
  }
  function BrandLists() {
    return (
      <Card>
        <div>
          {brandData && (
            <>
              {brandData.map((item, i) => (
                <BrandCard key={i} item={item} />
              ))}
            </>
          )}
        </div>
      </Card>
    );
  }
}
