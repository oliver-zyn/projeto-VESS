import React from 'react';
import { ChevronLeft } from 'lucide-react';
interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
}
export const Header: React.FC<HeaderProps> = ({ 
  title, 
  onBack, 
  showBackButton = true 
}) => {
  return (
    <div className="bg-amber-800 text-white p-4 flex items-center">
      {showBackButton && onBack && (
        <button onClick={onBack} className="mr-3 hover:bg-amber-700 p-1 rounded">
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
  );
};
