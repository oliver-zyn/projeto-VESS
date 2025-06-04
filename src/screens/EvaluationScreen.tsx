import React, { useState, useEffect } from "react";
import { MapPin, Camera, Info } from "lucide-react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import type { UserConfig, Layer, EvaluationStep } from "../types";
import {
  calculateSampleScore,
  getManagementDecision,
  formatDate,
  formatTime,
} from "../services/calculations";
import { VESS_SCORES } from "../utils/constants";

interface EvaluationScreenProps {
  onBack: () => void;
  config: UserConfig;
}

export const EvaluationScreen: React.FC<EvaluationScreenProps> = ({
  onBack,
  config,
}) => {
  const [currentStep, setCurrentStep] = useState<EvaluationStep>("setup");
  const [layerCount, setLayerCount] = useState(1);
  const [sampleName, setSampleName] = useState("Amostra 1");
  const [location, setLocation] = useState("");
  const [layers, setLayers] = useState<Layer[]>([{ length: 0, score: 1 }]);
  const [otherInfo, setOtherInfo] = useState("");
  const [managementDecision, setManagementDecision] = useState("");

  useEffect(() => {
    setLayers(
      Array(layerCount)
        .fill(null)
        .map(() => ({ length: 0, score: 1 }))
    );
  }, [layerCount]);

  const handleEvaluate = () => {
    setCurrentStep("result");
  };

  const handleNextSample = () => {
    const currentNumber = parseInt(sampleName.split(" ")[1]) || 1;
    setSampleName(`Amostra ${currentNumber + 1}`);
    setLayers(
      Array(layerCount)
        .fill(null)
        .map(() => ({ length: 0, score: 1 }))
    );
    setOtherInfo("");
    setManagementDecision("");
    setCurrentStep("setup");
  };

  const updateLayer = (index: number, field: keyof Layer, value: number) => {
    const newLayers = [...layers];
    newLayers[index] = { ...newLayers[index], [field]: value };
    setLayers(newLayers);
  };

  const sampleScore = calculateSampleScore(layers);

  if (currentStep === "setup") {
    return (
      <Layout>
        <Header title="Avaliações" onBack={onBack} />

        <div className="bg-amber-100 p-6 space-y-4">
          <Card className="text-center bg-amber-200">
            <p className="text-sm text-amber-900">
              Avaliação {formatDate(new Date())} - {formatTime(new Date())}
            </p>
            <button className="text-amber-700 text-sm font-medium hover:text-amber-800">
              Editar
            </button>
          </Card>

          <Input
            label="Nome da Amostra:"
            value={sampleName}
            onChange={(e) => setSampleName(e.target.value)}
          />

          <Input
            label="Avaliador:"
            value={config.name}
            disabled
            className="bg-amber-50"
          />

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">
              Quantas camadas de solo deseja avaliar?
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setLayerCount(num)}
                  className={`w-12 h-12 rounded-lg font-semibold transition-colors ${
                    layerCount === num
                      ? "bg-amber-700 text-white"
                      : "bg-amber-200 text-amber-800 hover:bg-amber-300"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Local/propriedade (GPS):
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Coordenadas ou endereço"
                className="flex-1 p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white"
              />
              <Button variant="secondary" size="md">
                <MapPin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <Button onClick={() => setCurrentStep("layers")} fullWidth>
            Continuar
          </Button>
        </div>
      </Layout>
    );
  }

  if (currentStep === "layers") {
    return (
      <Layout>
        <Header title="Avaliações" onBack={() => setCurrentStep("setup")} />

        <div className="bg-amber-100 p-6 space-y-4">
          {layers.map((layer, index) => (
            <Card key={index} title={`Camada ${index + 1}`}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-amber-800 mb-1">
                    Comprimento (cm):
                  </label>
                  <input
                    type="number"
                    value={layer.length || ""}
                    onChange={(e) =>
                      updateLayer(index, "length", Number(e.target.value))
                    }
                    className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-amber-800 mb-1">
                    Nota:
                  </label>
                  <select
                    value={layer.score}
                    onChange={(e) =>
                      updateLayer(index, "score", Number(e.target.value))
                    }
                    className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500"
                  >
                    {VESS_SCORES.map((score) => (
                      <option key={score} value={score}>
                        {score.toString().replace(".", ",")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="mt-2 text-amber-700 text-sm flex items-center hover:text-amber-800">
                <span>Escores VESS</span>
                <Info className="w-4 h-4 ml-1" />
              </button>
            </Card>
          ))}

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Outras informações importantes:
            </label>
            <textarea
              value={otherInfo}
              onChange={(e) => setOtherInfo(e.target.value)}
              placeholder="Sugestões que contribuam para a construção de um histórico..."
              rows={4}
              className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none bg-white"
            />
          </div>

          <Button variant="secondary" icon={Camera}>
            Foto
          </Button>

          <Button onClick={handleEvaluate} fullWidth>
            AVALIAR
          </Button>
        </div>
      </Layout>
    );
  }

  if (currentStep === "result") {
    return (
      <Layout>
        <Header title="Avaliações" onBack={() => setCurrentStep("layers")} />

        <div className="bg-amber-100 p-6 space-y-4">
          <Card className="text-center bg-amber-200">
            <h2 className="text-lg font-semibold text-amber-900">
              Escore Qe-VESS da amostra:
            </h2>
            <p className="text-2xl font-bold text-amber-800">{sampleScore}</p>
            <p className="text-sm text-amber-700">Ball et al. (2017)</p>
          </Card>

          <Card title="Resumo da avaliação:">
            <div className="text-sm text-amber-800 space-y-1">
              {layers.map((layer, index) => (
                <p key={index}>
                  Comprimento camada {index + 1}: {layer.length} cm; nota{" "}
                  {index + 1}: {layer.score}
                </p>
              ))}
              {otherInfo && <p className="mt-2 italic">{otherInfo}</p>}
            </div>
          </Card>

          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Decisão de manejo:
            </label>
            <textarea
              value={managementDecision}
              onChange={(e) => setManagementDecision(e.target.value)}
              placeholder="Descreva as decisões de manejo baseadas no escore..."
              rows={4}
              className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none bg-white"
            />
          </div>

          <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
            <p className="text-sm text-orange-800">
              {getManagementDecision(sampleScore)}
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => setCurrentStep("final")}
              variant="danger"
              className="flex-1"
            >
              FINALIZAR
            </Button>
            <Button
              onClick={handleNextSample}
              variant="secondary"
              className="flex-1"
            >
              PRÓXIMA AMOSTRA
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
};
