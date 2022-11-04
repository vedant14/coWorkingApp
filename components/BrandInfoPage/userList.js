import {
  CheckCircleIcon,
  ChevronRightIcon,
  MailIcon,
  UserIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { Card } from "../atoms/card";
export function UserList({ brandId, userData }) {
  if (!userData || userData.length === 0) {
    return null;
  } else {
    return <UserDetails />;
  }

  function UserDetails() {
    return (
      <Card>
        <div className="pl-6 mt-5 border-b border-gray-200">
          <dt className="text-md font-medium text-gray-500 mb-4">
            Brand Users
          </dt>
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          {userData.map((user, i) => (
            <li key={i}>
              <Link href={`/${userData.id}`} passHref>
                <a className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm flex items-center font-medium text-neutral-700 truncate">
                        <UserIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {user.user_id.first_name} {user.user_id.last_name}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Admin
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex justify-between">
                      <div className="sm:flex">
                        <p className="flex truncate items-center text-sm text-gray-500">
                          <MailIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {user.user_id.email}
                        </p>
                      </div>
                      <div>
                        <ChevronRightIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
          <li>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-neutral-600 truncate">
                  Click here to{" "}
                  <Link href={`/brands/${brandId}/new-location`}>
                    <a className="text-dark-green text-bold underline">
                      invite a new user
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </Card>
    );
  }
}
