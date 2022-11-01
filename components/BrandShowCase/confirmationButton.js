import { ChevronDownIcon } from "@heroicons/react/solid";
import { classNames } from "../../utils/helperFunctions";
import { BrandButton } from "../atoms/brandButton";
export function ConfirmationButton({ slug, open, setOpen, locationData }) {
  function toggleButton(e) {
    e.preventDefault();
    setOpen((prevOpen) => !prevOpen);
  }

  return (
    <div>
      <button
        type="button"
        onClick={(e) => toggleButton(e)}
        className="bg-white border-2 border-dark-green w-full py-4 drop-shadow-[5px_5px_0px_rgba(209,167,87,1)]"
      >
        <div className="inline-flex items-center font-medium">
          Confirm your seat
          <ChevronDownIcon
            className={classNames(
              open === true && `rotate-180`,
              `w-6 h-6 mt-1 ml-2 -mr-2`
            )}
            aria-hidden="true"
          />
        </div>
      </button>
      {open === true && (
        <div className="mt-8 space-y-8">
          {locationData.map((item, i) => (
            <BrandButton
              key={i}
              text={`${item.name} Location`}
              link={`/book/${slug}/confirm?location=${item.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
