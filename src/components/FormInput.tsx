import React from "react";
import type { FormInputProps } from "../types";

function FormInput({ label, ...inputProps }: FormInputProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputProps.id}
        className="mb-1 font-medium"
      >
        {label}
      </label>

      <input
        className="border border-gray-400 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...inputProps}
      />
    </div>
  );
}

export default FormInput;
