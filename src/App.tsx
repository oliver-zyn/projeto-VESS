import { useState } from "react";
import { MainMenu } from "./screens/MainMenu";
import { ConfigScreen } from "./screens/ConfigScreen";
import { EvaluationScreen } from "./screens/EvaluationScreen";
import { TutorialScreen } from "./screens/TutorialScreen";
import { AboutScreen } from "./screens/AboutScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { UserConfig, Screen, Evaluation } from "./types";
import { DEFAULT_USER_CONFIG } from "./utils/constants";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu");
  const [userConfig, setUserConfig] = useLocalStorage<UserConfig>(
    "vess-user-config",
    DEFAULT_USER_CONFIG
  );
  const [evaluations] = useLocalStorage<Evaluation[]>("vess-evaluations", []);

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleBackToMenu = () => {
    setCurrentScreen("menu");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "menu":
        return <MainMenu onNavigate={handleNavigate} />;

      case "config":
        return (
          <ConfigScreen
            onBack={handleBackToMenu}
            config={userConfig}
            setConfig={setUserConfig}
          />
        );

      case "evaluate":
        return (
          <EvaluationScreen onBack={handleBackToMenu} config={userConfig} />
        );

      case "history":
        return (
          <HistoryScreen onBack={handleBackToMenu} evaluations={evaluations} />
        );

      case "about":
        return <AboutScreen onBack={handleBackToMenu} />;

      case "equipment":
        return <TutorialScreen onBack={handleBackToMenu} type="equipment" />;

      case "where":
        return <TutorialScreen onBack={handleBackToMenu} type="where" />;

      case "when":
        return <TutorialScreen onBack={handleBackToMenu} type="when" />;

      case "extraction":
        return <TutorialScreen onBack={handleBackToMenu} type="extraction" />;

      default:
        return <MainMenu onNavigate={handleNavigate} />;
    }
  };

  return <div className="App">{renderScreen()}</div>;
}

export default App;
