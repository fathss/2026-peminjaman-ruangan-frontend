import type { FormTextAreaProps } from "../types";

function FormTextArea({ label, icon, error, ...textareaProps }: FormTextAreaProps) {
  return (
    <div>
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 block">
        {label}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-3.5 text-gray-400">{icon}</div>}
        <textarea
          className={`w-full ${icon ? 'pl-12' : 'pl-4'} pr-4 py-3.5 bg-gray-50 border ${
            error ? 'border-red-300' : 'border-gray-200'
          } rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all resize-none`}
          {...textareaProps}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
}

export default FormTextArea;
