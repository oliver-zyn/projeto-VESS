import React from "react";
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}
export const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen bg-amber-50 ${className}`}>
      <div className="max-w-md mx-auto">{children}</div>
    </div>
  );
};
