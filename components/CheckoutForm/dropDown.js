import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { classNames } from "../../utils/helperFunctions";
import { LocationMarkerIcon, TicketIcon } from "@heroicons/react/solid";
export function DropDown({ type, label, optionsArray, selected, setSelected }) {
  function callSetSelected(e, data) {
    e.preventDefault();
    setSelected(data);
  }
  return (
    <div className="my-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <Menu as="div" className="relative w-full inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
            <div className="inline-flex items-center">
              {type === "location" ? (
                <LocationMarkerIcon className="h-4 mr-3" />
              ) : (
                <TicketIcon className="h-4 mr-3" />
              )}
              <p>{!selected ? "Options" : selected.name} </p>
            </div>
            <img src="/icons/display/arrow-up-down.svg" className="mr-2" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute w-full max-h-40 overflow-scroll right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {optionsArray.map((item, i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm cursor-pointer hover:bg-gray-200"
                      )}
                      onClick={(e) => {
                        callSetSelected(e, item);
                      }}
                    >
                      {item.name}
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
