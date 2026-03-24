import type { FormInputProps } from "../types";

function FormInput({ label, error, info, ...inputProps }: FormInputProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputProps.id}
        className="mb-1 font-medium"
      >
        {label}
      </label>

      <input
        className={`border border-gray-400 rounded p-2 focus:outline-none focus:ring-2
          ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
        {...inputProps}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1">
          {error}
        </span>
      )}
      {info && (
        <span className="text-gray-500 text-xs mt-1">
          {info}
        </span>
      )}
    </div>
  );
}

export default FormInput;
