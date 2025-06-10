import React, { useState } from "react";
import { MainMenu } from "./screens/MainMenu";
import { ConfigScreen } from "./screens/ConfigScreen";
import { EvaluationScreen } from "./screens/EvaluationScreen";
import { TutorialScreen } from "./screens/TutorialScreen";
import { AboutScreen } from "./screens/AboutScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
// NOVAS IMPORTAÇÕES
import { ExpositionScreen } from "./screens/ExpositionScreen";
import { ScoresScreen } from "./screens/ScoresScreen";
import { ManagementScreen } from "./screens/ManagementScreen";
import { ComplementaryScreen } from "./screens/ComplementaryScreen";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { useEvaluations } from "./hooks/useEvaluations";
import type { Screen } from "./types";

const AppContent: React.FC = () => {
  const { user, loading, isAuthenticated, updateProfile } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<
    Screen | "login" | "register"
  >("login");
  const { evaluations, loading: evaluationsLoading } = useEvaluations();

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleBackToMenu = () => {
    setCurrentScreen("menu");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-800">Carregando VESS...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (currentScreen === "register") {
      return (
        <RegisterScreen onNavigateToLogin={() => setCurrentScreen("login")} />
      );
    }
    return (
      <LoginScreen onNavigateToRegister={() => setCurrentScreen("register")} />
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "menu":
        return <MainMenu onNavigate={handleNavigate} />;

      case "config":
        return (
          <ConfigScreen
            onBack={handleBackToMenu}
            config={user!}
            setConfig={updateProfile}
          />
        );

      case "evaluate":
        return <EvaluationScreen onBack={handleBackToMenu} config={user!} />;

      case "history":
        return (
          <HistoryScreen
            onBack={handleBackToMenu}
            evaluations={evaluations}
            loading={evaluationsLoading}
          />
        );

      case "about":
        return <AboutScreen onBack={handleBackToMenu} />;

      // TUTORIAIS EXISTENTES
      case "equipment":
        return <TutorialScreen onBack={handleBackToMenu} type="equipment" />;

      case "where":
        return <TutorialScreen onBack={handleBackToMenu} type="where" />;

      case "when":
        return <TutorialScreen onBack={handleBackToMenu} type="when" />;

      case "extraction":
        return <TutorialScreen onBack={handleBackToMenu} type="extraction" />;

      // NOVAS TELAS
      case "exposition":
        return <ExpositionScreen onBack={handleBackToMenu} />;

      case "scores":
        return <ScoresScreen onBack={handleBackToMenu} />;

      case "management":
        return <ManagementScreen onBack={handleBackToMenu} />;

      case "complementary":
        return <ComplementaryScreen onBack={handleBackToMenu} />;

      default:
        return <MainMenu onNavigate={handleNavigate} />;
    }
  };

  return renderScreen();
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
