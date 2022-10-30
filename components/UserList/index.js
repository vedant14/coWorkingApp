import {
  CheckCircleIcon,
  ChevronRightIcon,
  MailIcon,
} from "@heroicons/react/solid";
import { getInitials } from "../../utils/helperFunctions";

export function UserList({ userData }) {
  if (!userData || userData.length === 0) {
    return null;
  } else {
    return <UserDetails />;
  }

  function UserDetails() {
    return (
      <div>
        <div className="pl-6 border-b border-gray-200">
          <dt className="text-md font-medium text-gray-500 my-4">
            Brand Users
          </dt>
        </div>
        <ul role="list" className="divide-y divide-gray-200">
          {userData.map((user, i) => (
            <li key={i}>
              <a href="www.google.com" className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  {/* <div className="flex-shrink-0">
                    <div className="bg-dark-green h-10 w-10 text-light-green flex justify-center items-center rounded-full">
                      <span className="">{getInitials("Vedant")}</span>
                    </div>
                  </div> */}
                  <div className="min-w-0 flex-1 px-2">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {user.user_id.first_name} {user.user_id.last_name}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      <MailIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="truncate">{user.user_id.email}</span>
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      <CheckCircleIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                      Admin
                    </p>
                  </div>
                  <div>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
