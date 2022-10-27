import { useRouter } from "next/router";
import Link from "next/link";
import { CustomBreadcrumb } from "../atoms/customBreadCrumb";

export function PageHeading({
  name,
  subtext,
  breadcrumbs,
  primaryText,
  primaryLink,
  secondaryText,
  secondaryLink,
}) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <div>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center mb-2 space-x-4">
            <CustomBreadcrumb name="Dashboard" link="/dashboard" />
            {breadcrumbs && (
              <>
                {breadcrumbs.map((item, i) => (
                  <CustomBreadcrumb name={item.name} link={item.link} key={i} />
                ))}
              </>
            )}
            {router.pathname !== "/dashboard" && (
              <CustomBreadcrumb name={name} />
            )}
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {name}
          </h2>
          <p className="text-neutral-500"> {subtext}</p>
        </div>
        <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          {secondaryLink && (
            <Link href={secondaryLink}>
              <button
                type="button"
                className="ml-3 inline-flex items-center px-4 py-2 border border-dark-green rounded-md shadow-sm text-sm font-medium text-dark-green bg-neutral-50 hover:border-dark-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-green"
              >
                {secondaryText}
              </button>
            </Link>
          )}
          {primaryLink && (
            <Link href={primaryLink}>
              <button
                type="button"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-dark-green hover:bg-dark-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-green"
              >
                {primaryText}
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
