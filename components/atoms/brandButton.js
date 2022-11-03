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
              ? "bg-dark-green text-white drop-shadow-[5px_5px_0px_rgba(252,211,77,1)] "
              : "bg-white text-black drop-shadow-[5px_5px_0px_rgba(209,167,87,1)]",
            "border-2 border-dark-green w-full my-4 py-4"
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
              "border-2 border-dark-green w-full my-4 py-4 drop-shadow-[5px_5px_0px_rgba(209,167,87,1)]"
            )}
          >
            <div className="inline-flex items-center font-medium">{text}</div>
          </button>
        </Link>
      )}
    </>
  );
}
