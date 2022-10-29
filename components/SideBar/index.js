import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import siteData from "../../data/siteconfig.json";
import { useAuth } from "../../context/AuthContext";
import { classNames } from "../../utils/helperFunctions";
export function SideBar() {
  const router = useRouter();
  const { currentUser } = useAuth();

  function ItemName({ item }) {
    return (
      <Link href={item.link}>
        <li
          className={classNames(
            router.pathname === `${item.link}`
              ? "text-dark-green"
              : "text-neutral-400",
            "cursor-pointer hover:opacity-80 flex items-center group flex px-2 py-2 text-base font-medium rounded-md "
          )}
        >
          <img
            src={item.inactiveIcon}
            className={classNames(
              router.pathname === `${item.link}` && "hidden",
              "mr-4 flex-shrink-0 h-6 w-6"
            )}
          />
          <img
            src={item.activeIcon}
            className={classNames(
              router.pathname !== `${item.link}` && "hidden",
              "mr-4 flex-shrink-0 h-6 w-6"
            )}
          />
          <p>{item.name}</p>
        </li>
      </Link>
    );
  }

  return (
    <div className="hidden bg-white md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="mt-20 flex-1 h-0 overflow-y-auto">
        <ul className="py-4 pl-6 pr-2 space-y-4">
          {siteData.map((item, i) => (
            <div key={i}>
              {item.merchant === true ? (
                currentUser.merchant === true && <ItemName item={item} />
              ) : (
                <ItemName item={item} />
              )}
            </div>
          ))}
        </ul>
        <div className="absolute w-full bottom-10 px-6 ">
          <ul className="border-t border-light-green text-dark-green pt-4 space-y-4">
            <li>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.NEXT_PUBLIC_URL}/book/${currentUser.slug}`}
                target="_blank"
                className="border flex justify-between border-dark-green py-2.5 px-4 rounded-md"
              >
                <div>Share on Linkedin</div>
                <div>
                  <img
                    src="/icons/social/linkedIn.svg"
                    className="flex-shrink-0 ml-2 h-6 w-6"
                  />
                </div>
              </a>
            </li>
            {/* <Link href="/settings">
              <li className="cursor-pointer hover:opacity-80 flex items-center group px-2 py-2 text-base font-light rounded-md">
                <img
                  src="/icons/display/settings.svg"
                  className="mr-4 flex-shrink-0 h-6 w-6"
                />
                Settings
              </li>
            </Link> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
