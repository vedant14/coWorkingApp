import { classNames, getInitials } from "../../utils/helperFunctions";
import Link from "next/link";
export function BrandCard({ item }) {
  return (
    <li className="p-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div
            className={classNames(
              "bg-dark-green h-10 w-10 text-light-green flex justify-center items-center rounded-full"
            )}
          >
            <span className="">{getInitials(item.name)}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-md font-bold text-gray-900 truncate capitalize">
            {item.name}
          </p>
          <p className="text-sm text-gray-500 truncate">#{item.id}</p>
        </div>
        <div>
          <Link href={`/brands/${item.id}/edit`}>
            <a className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
              EDIT
            </a>
          </Link>
        </div>
      </div>
    </li>
  );
}
