import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export function Header() {
  const { currentUser } = useAuth();
  return (
    <div className="bg-neutral-50 fixed w-full top-0 z-10 flex-shrink-0 flex h-16">
      <div className="my-auto mr-auto">
        <img
          src="/logo.svg"
          alt="logo"
          className="py-4 h-18 pl-6 pr-2 space-y-1"
        />
      </div>
      <div className="text-dark-green my-auto hidden md:inline-flex font-medium items-center ml-auto pr-16 space-x-4">
        {/* <div className="bg-neutral-200 rounded-md py-2.5 px-2 flex items-center space-x-1">
          <img src="/icons/display/rupee.svg" alt="Rupee" />
          <p className="text-sm"> Total earnings: 100</p>
        </div> */}
        <div className="flex items-center space-x-2">
          {!currentUser.profilePic || currentUser.profilePic === false ? (
            <img
              src="/vectors/avatar.svg"
              className="w-8 h-8 object-cover rounded-md"
            />
          ) : (
            <img
              src={`${currentUser.profilePic}&random=+${new Date().getTime()}`}
              className="w-8 h-8 object-cover rounded-md"
            />
          )}
          <p className="text-sm">
            {currentUser.firstName} {currentUser.lastName}
          </p>
        </div>
        {currentUser.merchant === true && (
          <Link href={`/book/${currentUser.slug}`} passHref>
            <a target="_blank" className="bg-dark-green p-1 rounded">
              <img src="/icons/display/link.svg" alt="link" />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
