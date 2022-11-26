import { classNames } from "../../utils/helperFunctions";
export function InputText({
  id,
  label,
  type,
  placeholder,
  value,
  onChangeValue,
  width,
  actionText,
  action,
}) {
  return (
    <div className="w-full">
      <label className="block text-sm text-neutral-400 sm:mt-px sm:pt-2 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-1">
        <input
          id={id}
          name={id}
          type={type ? type : "text"}
          className={classNames(
            width === "full" ? "w-full" : "w-full max-w-lg",
            "sm:text-sm px-3 mr-2 h-10 appearance-none rounded-md border border-gray-300 bg-neutral-50 block placeholder-gray-500 text-neutral-700 focus:outline-none focus:ring-dark-green focus:border-dark-green focus:z-10 "
          )}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />
        {actionText && (
          <button
            className="bg-dark-green px-5 h-10 rounded-md text-neutral-100"
            onClick={(e) => action(e)}
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}
