export function GradientButton({ label, onClickFunction }) {
  return (
    <div>
      <button
        className="w-full py-3 rounded-md bg-primary-gradient text-white text-base font-medium"
        onClick={(e) => onClickFunction(e)}
      >
        {label}
      </button>
    </div>
  );
}
