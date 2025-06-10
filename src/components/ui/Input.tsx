import React from "react";
interface InputProps {
  label?: string;
  type?: "text" | "email" | "number" | "password";
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}
export const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  className = "",
}) => {
  const inputClasses = `
    w-full p-3 border border-amber-300 rounded-lg 
    focus:ring-2 focus:ring-amber-500 focus:border-transparent 
    bg-white transition-colors
    ${disabled ? "bg-amber-50 cursor-not-allowed" : ""}
    ${className}
  `.trim();
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-amber-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClasses}
      />
    </div>
  );
};
