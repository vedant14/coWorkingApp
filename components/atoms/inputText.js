import { classNames } from "../../utils/helperFunctions";
export function InputText({
  id,
  label,
  addText,
  type,
  placeholder,
  value,
  onChangeValue,
  width,
}) {
  return (
    <div className="w-full">
      <label className="block text-sm text-neutral-400 sm:mt-px sm:pt-2">
        {label}
      </label>
      <div className="flex items-center space-x-1">
        <p className="text-xs whitespace-nowrap text-neutral-700">{addText}</p>
        <input
          id={id}
          name={id}
          type={type}
          className={classNames(
            width === "full" ? "w-full" : "w-full max-w-lg",
            addText
              ? "text-xs border-b border-neutral-100"
              : "sm:text-sm mt-2 px-3 h-10 border border-neutral-100 rounded",
            "appearance-none bg-neutral-50 block  placeholder-gray-500 text-neutral-700 focus:outline-none focus:ring-dark-green focus:border-dark-green focus:z-10 "
          )}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />
      </div>
    </div>
  );
}
