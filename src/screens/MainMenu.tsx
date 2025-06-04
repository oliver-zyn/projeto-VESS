// src/screens/MainMenu.tsx
import React from "react";
import {
  MapPin,
  Settings,
  History,
  Info,
  Wrench,
  Calendar,
  Eye,
} from "lucide-react";
import { Layout } from "../components/ui/Layout";
import { Button } from "../components/ui/Button";
import type { Screen } from "../types";

interface MainMenuProps {
  onNavigate: (screen: Screen) => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  return (
    <Layout>
      <div className="bg-amber-800 text-white p-6">
        <h1 className="text-3xl font-bold text-center tracking-wide">VESS</h1>
      </div>

      <div className="bg-amber-100 p-6 space-y-6">
        <Button
          onClick={() => onNavigate("evaluate")}
          size="lg"
          fullWidth
          className="text-2xl font-bold py-6 rounded-2xl shadow-lg"
        >
          AVALIAR
        </Button>

        <div className="border-t-2 border-dashed border-amber-600 my-6"></div>

        <div>
          <h2 className="text-lg font-semibold text-amber-900 mb-4">
            Processo de avaliação
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onNavigate("equipment")}
              className="bg-amber-600 hover:bg-amber-700 text-white p-6 rounded-2xl transition-colors shadow-md"
            >
              <div className="flex flex-col items-center space-y-3">
                <Wrench className="w-8 h-8" />
                <span className="text-sm font-medium">Equipamentos</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate("where")}
              className="bg-amber-600 hover:bg-amber-700 text-white p-6 rounded-2xl transition-colors shadow-md"
            >
              <div className="flex flex-col items-center space-y-3">
                <MapPin className="w-8 h-8" />
                <span className="text-sm font-medium">Onde amostrar</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate("when")}
              className="bg-amber-600 hover:bg-amber-700 text-white p-6 rounded-2xl transition-colors shadow-md"
            >
              <div className="flex flex-col items-center space-y-3">
                <Calendar className="w-8 h-8" />
                <span className="text-sm font-medium">Quando amostrar</span>
              </div>
            </button>

            <button
              onClick={() => onNavigate("extraction")}
              className="bg-amber-600 hover:bg-amber-700 text-white p-6 rounded-2xl transition-colors shadow-md"
            >
              <div className="flex flex-col items-center space-y-3">
                <Eye className="w-8 h-8" />
                <span className="text-sm font-medium">Extração da amostra</span>
              </div>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-8 pt-6">
          <button
            onClick={() => onNavigate("about")}
            className="flex flex-col items-center p-3 text-amber-800 hover:text-amber-900 transition-colors"
          >
            <Info className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">O que é o VESS</span>
          </button>
          <button
            onClick={() => onNavigate("history")}
            className="flex flex-col items-center p-3 text-amber-800 hover:text-amber-900 transition-colors"
          >
            <History className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Minhas avaliações</span>
          </button>
          <button
            onClick={() => onNavigate("config")}
            className="flex flex-col items-center p-3 text-amber-800 hover:text-amber-900 transition-colors"
          >
            <Settings className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Configurações</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};
