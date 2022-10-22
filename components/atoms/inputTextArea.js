export function InputTextArea({
  id,
  label,
  placeholder,
  value,
  onChangeValue,
}) {
  return (
    <div className="w-full">
      <label className="block text-sm text-neutral-400 sm:mt-px sm:pt-2">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows="4"
        placeholder={placeholder}
        className="w-full mt-2 appearance-none block px-3 py-2 border border-neutral-100 rounded bg-neutral-50 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-dark-green focus:border-dark-green focus:z-10 sm:text-sm"
        style={{ resize: "none" }}
        defaultValue={value}
        onChange={(e) => onChangeValue(e.target.value)}
      />
    </div>
  );
}
