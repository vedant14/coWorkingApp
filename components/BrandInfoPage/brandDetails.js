import { Card } from "../atoms/card";
import { randomIntFromInterval } from "../../utils/helperFunctions";
export function BrandDetailsSection(brandData) {
  return (
    <Card>
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2 px-6">
          <dt className="text-sm font-medium text-gray-500">
            Brand Description
          </dt>
          <dd className="mt-1 text-sm text-gray-900">
            {brandData.description}
          </dd>
        </div>
        <div className="sm:col-span-1 px-6">
          <dt className="text-sm font-medium text-gray-500">Owner Name</dt>
          <dd className="mt-1 text-sm text-gray-900">Margot Foster</dd>
        </div>
        <div className="sm:col-span-1 px-6">
          <dt className="text-sm font-medium text-gray-500"># of Locations</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {randomIntFromInterval(1, 10)}
          </dd>
        </div>
        <div className="sm:col-span-1 px-6">
          <dt className="text-sm font-medium text-gray-500">
            Customer Support Email
          </dt>
          <dd className="mt-1 text-sm text-gray-900">
            margotfoster@example.com
          </dd>
        </div>
        <div className="sm:col-span-1 px-6">
          <dt className="text-sm font-medium text-gray-500">
            Earnings this month
          </dt>
          <dd className="mt-1 text-sm text-gray-900">
            Rs. {randomIntFromInterval(1000, 10000)}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
