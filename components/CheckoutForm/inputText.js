export function InputText({
  id,
  label,
  type,
  placeholder,
  value,
  onChangeValue,
}) {
  return (
    <div className="my-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className="mt-1 block w-full rounded-md border-gray-300 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 shadow-sm"
        placeholder={placeholder}
      />
    </div>
  );
}
