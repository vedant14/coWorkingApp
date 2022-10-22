import Multiselect from "multiselect-react-dropdown";

export function MultiSelectOptions({
  id,
  label,
  options,
  placeholder,
  value,
  onChangeValue,
}) {
  return (
    <div className="py-3 w-full">
      <label className="block mt-4 text-sm text-neutral-400 sm:mt-px sm:pt-2">
        {label}
      </label>
      <Multiselect
        id={id}
        options={options}
        placeholder={placeholder}
        className="mt-2 appearance-none block px-3 py-1 border border-neutral-100 rounded bg-neutral-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-dark-green focus:border-dark-green focus:z-10 sm:text-sm"
        selectedValues={value}
        isObject={false}
        onSelect={onChangeValue}
        onRemove={onChangeValue}
        style={{
          chips: {
            background: "#94A3B8",
            marginBottom: "0px",
          },
          searchBox: {
            border: "none",
            borderRadius: "0px",
          },
        }}
      />
    </div>
  );
}
