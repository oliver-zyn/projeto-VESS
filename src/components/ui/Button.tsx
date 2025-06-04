import React from "react";
import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "warning";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-amber-700 text-white hover:bg-amber-800 focus:ring-amber-500",
    secondary:
      "bg-amber-200 text-amber-900 hover:bg-amber-300 focus:ring-amber-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    warning:
      "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";
  const widthClasses = fullWidth ? "w-full" : "";

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClasses}
    ${widthClasses}
    ${className}
  `.trim();

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {Icon && iconPosition === "left" && (
        <Icon className={`w-5 h-5 ${children ? "mr-2" : ""}`} />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon className={`w-5 h-5 ${children ? "ml-2" : ""}`} />
      )}
    </button>
  );
};
