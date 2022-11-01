import Link from "next/link";
import { classNames } from "../../utils/helperFunctions";
export function BrandButton({ text, link, type, onClickAction }) {
  if (!link) {
    var link = "/";
  }
  return (
    <>
      {onClickAction ? (
        <button
          type="button"
          onClick={(e) => onClickAction()}
          className={classNames(
            type === "dark"
              ? "bg-dark-green text-white"
              : "bg-white text-black",
            "border-2 border-dark-green w-full my-4 py-4 drop-shadow-custom-button "
          )}
        >
          <div className="inline-flex items-center font-medium">{text}</div>
        </button>
      ) : (
        <Link href={link} passHref>
          <button
            type="button"
            className={classNames(
              type === "dark"
                ? "bg-dark-green text-white"
                : "bg-white text-black",
              "border-2 border-dark-green w-full my-4 py-4 drop-shadow-custom-button "
            )}
          >
            <div className="inline-flex items-center font-medium">{text}</div>
          </button>
        </Link>
      )}
    </>
  );
}
