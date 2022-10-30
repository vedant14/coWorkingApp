export function UnOrderedList({ heading1, heading2, heading3, tag, link }) {
  return (
    <li>
      <a href="www.google.com" className="block hover:bg-gray-50">
        <div className="flex items-center px-4 py-4">
          <div className="min-w-0 flex-1 px-2">
            <p className="flex items-center text-sm text-gray-500">
              <UserIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span className="truncate font-medium">{heading1}</span>
            </p>
            <p className="mt-1 flex items-center text-sm text-gray-500">
              <MailIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span className="truncate">{heading2}</span>
            </p>
            <p className="mt-1 flex items-center text-sm text-gray-500">
              <CheckCircleIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                aria-hidden="true"
              />
              {tag}
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
  );
}
