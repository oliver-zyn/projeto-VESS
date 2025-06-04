import React from "react";
import type { LucideIcon } from "lucide-react";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "clickable";
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  icon: Icon,
  onClick,
  variant = "default",
  className = "",
}) => {
  const baseClasses =
    "bg-white rounded-lg border border-amber-300 p-4 transition-colors";
  const clickableClasses =
    variant === "clickable"
      ? "cursor-pointer hover:bg-amber-50 hover:border-amber-400"
      : "";

  const classes = `${baseClasses} ${clickableClasses} ${className}`.trim();

  const CardContent = (
    <>
      {(title || Icon) && (
        <div className="flex items-center mb-3">
          {Icon && <Icon className="w-5 h-5 text-amber-700 mr-2" />}
          {title && <h3 className="font-semibold text-amber-900">{title}</h3>}
        </div>
      )}
      {children}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {CardContent}
      </button>
    );
  }

  return <div className={classes}>{CardContent}</div>;
};
