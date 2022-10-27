import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/solid";
export function CustomBreadcrumb({ name, link }) {
  return (
    <li>
      <div className="flex items-center">
        {link !== "/dashboard" && (
          <ChevronRightIcon
            className="flex-shrink-0 h-5 w-5 text-gray-400 mr-4"
            aria-hidden="true"
          />
        )}
        {link === null || link === undefined ? (
          <span className="text-sm capitalize font-medium text-gray-800 cursor-default">
            {name}
          </span>
        ) : (
          <Link href={link}>
            <span className="text-sm capitalize font-medium text-gray-500 cursor-pointer">
              {name}
            </span>
          </Link>
        )}
      </div>
    </li>
  );
}
