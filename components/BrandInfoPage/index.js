import { randomIntFromInterval } from "../../utils/helperFunctions";
import { LocationList } from "./locationList";
import { UserList } from "../UserList";
export function BrandInfoPage({ brandData }) {
  return (
    <div>
      <div className="max-w-3xl mx-auto lg:max-w-7xl">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Brand Description
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {brandData.description}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Owner Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          Margot Foster
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          # of Locations
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {randomIntFromInterval(1, 10)}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Customer Support Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          margotfoster@example.com
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">
                          Earnings this month
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          Rs. {randomIntFromInterval(1000, 10000)}
                        </dd>
                      </div>

                      <div className="sm:col-span-2 border-t border-gray-200">
                        <dt className="text-md font-medium text-gray-500 my-4">
                          Brand Locations
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <ul
                            role="list"
                            className="border border-gray-200 rounded-md divide-y divide-gray-200"
                          >
                            <LocationList
                              brandId={brandData.id}
                              locationData={brandData.locations}
                            />
                          </ul>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <UserList userData={brandData.brand_users} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
