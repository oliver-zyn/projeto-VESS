import React, { useState, useEffect } from "react";
import { MapPin, Camera, Info, Save, Plus } from "lucide-react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import type {
  UserConfig,
  Layer,
  EvaluationStep,
  Sample,
  EvaluationData,
  VessScore,
} from "../types";
import {
  calculateSampleScore,
  getManagementDecision,
  formatDate,
  formatTime,
} from "../services/calculations";
import { VESS_SCORES } from "../utils/constants";
import { useEvaluations } from "../hooks/useEvaluations";
interface EvaluationScreenProps {
  onBack: () => void;
  config: UserConfig & { id: string };
}
export const EvaluationScreen: React.FC<EvaluationScreenProps> = ({
  onBack,
  config,
}) => {
  const [currentStep, setCurrentStep] = useState<EvaluationStep>("setup");
  const [evaluationName, setEvaluationName] = useState("");
  const [startTime] = useState(formatTime(new Date()));
  const [samples, setSamples] = useState<Partial<Sample>[]>([]);
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [loading, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [finalManagementDescription, setFinalManagementDescription] =
    useState("");
  const { createEvaluation } = useEvaluations();
  const [layerCount, setLayerCount] = useState(1);
  const [sampleName, setSampleName] = useState("Amostra 1");
  const [location, setLocation] = useState("");
  const [layers, setLayers] = useState<Layer[]>([{ length: 0, score: 1 }]);
  const [otherInfo, setOtherInfo] = useState("");
  const [managementDecision, setManagementDecision] = useState("");
  useEffect(() => {
    if (!evaluationName) {
      const now = new Date();
      setEvaluationName(`Avaliação ${formatDate(now)} - ${formatTime(now)}`);
    }
  }, []);
  useEffect(() => {
    setLayers(
      Array(layerCount)
        .fill(null)
        .map((_, index) => ({
          length: 0,
          score: 1,
          order: index + 1,
        }))
    );
  }, [layerCount]);
  const updateLayer = (index: number, field: keyof Layer, value: number) => {
    const newLayers = [...layers];
    newLayers[index] = { ...newLayers[index], [field]: value };
    setLayers(newLayers);
  };
  const validateCurrentSample = () => {
    if (!sampleName.trim()) return "Nome da amostra é obrigatório";
    if (layers.some((layer) => layer.length <= 0))
      return "Todos os comprimentos devem ser maiores que zero";
    if (layers.some((layer) => !VESS_SCORES.includes(layer.score as VessScore)))
      return "Todas as notas devem ser válidas";
    return null;
  };
  const saveCurrentSample = () => {
    const validationError = validateCurrentSample();
    if (validationError) {
      setError(validationError);
      return false;
    }
    const sampleScore = calculateSampleScore(layers);
    const newSample: Partial<Sample> = {
      name: sampleName,
      location,
      otherInfo,
      managementDecision,
      layers: layers.map((layer, index) => ({
        ...layer,
        order: index + 1,
      })),
      sampleScore,
    };
    const newSamples = [...samples];
    newSamples[currentSampleIndex] = newSample;
    setSamples(newSamples);
    setError("");
    return true;
  };
  const handleEvaluate = () => {
    if (saveCurrentSample()) {
      setCurrentStep("result");
    }
  };
  const handleNextSample = () => {
    if (saveCurrentSample()) {
      const nextIndex = currentSampleIndex + 1;
      setCurrentSampleIndex(nextIndex);
      setSampleName(`Amostra ${nextIndex + 1}`);
      setLocation("");
      setLayers(
        Array(layerCount)
          .fill(null)
          .map((_, index) => ({
            length: 0,
            score: 1,
            order: index + 1,
          }))
      );
      setOtherInfo("");
      setManagementDecision("");
      setCurrentStep("setup");
    }
  };
  const handleFinalize = () => {
    if (saveCurrentSample()) {
      setCurrentStep("final");
    }
  };
  const handleFinalSave = async () => {
    try {
      setSaving(true);
      setError("");
      const allSamples = [...samples];
      const evaluationData: EvaluationData = {
        name: evaluationName,
        date: formatDate(new Date()),
        startTime,
        endTime: formatTime(new Date()),
        managementDescription: finalManagementDescription,
        samples: allSamples.map((sample) => ({
          name: sample.name!,
          location: sample.location,
          otherInfo: sample.otherInfo,
          managementDecision: sample.managementDecision,
          layers: sample.layers!.map((layer, index) => ({
            length: layer.length,
            score: layer.score,
            order: index + 1,
          })),
        })),
      };
      await createEvaluation(evaluationData);
      onBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar avaliação");
    } finally {
      setSaving(false);
    }
  };
  const calculateAverageScore = () => {
    if (samples.length === 0) return 0;
    const sampleScores = samples.map((sample) => sample.sampleScore || 0);
    return Number(
      (
        sampleScores.reduce((sum, score) => sum + score, 0) /
        sampleScores.length
      ).toFixed(1)
    );
  };
  const calculateEvaluationTime = () => {
    const start = new Date(`2024-01-01 ${startTime}`);
    const end = new Date(`2024-01-01 ${formatTime(new Date())}`);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
  };
  const sampleScore = calculateSampleScore(layers);
  if (currentStep === "setup") {
    return (
      <Layout>
        <Header title="Nova Avaliação" onBack={onBack} />
        <div className="bg-amber-100 p-6 space-y-4">
          {error && (
            <Card className="bg-red-100 border-red-300">
              <p className="text-red-800 text-center">{error}</p>
            </Card>
          )}
          <Card className="text-center bg-amber-200">
            <Input
              value={evaluationName}
              onChange={(e) => setEvaluationName(e.target.value)}
              className="text-center font-medium"
            />
            <p className="text-sm text-amber-700 mt-2">
              Iniciada às {startTime}
            </p>
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
          <div className="text-center text-sm text-amber-700">
            <p>Amostra {currentSampleIndex + 1}</p>
            {samples.length > 0 && (
              <p className="text-xs">
                ({samples.length} amostra(s) já coletada(s))
              </p>
            )}
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
        <Header
          title="Dados das Camadas"
          onBack={() => setCurrentStep("setup")}
        />
        <div className="bg-amber-100 p-6 space-y-4">
          {error && (
            <Card className="bg-red-100 border-red-300">
              <p className="text-red-800 text-center">{error}</p>
            </Card>
          )}
          <Card className="text-center bg-amber-200">
            <h3 className="font-semibold text-amber-900">{sampleName}</h3>
            <p className="text-sm text-amber-700">
              Amostra {currentSampleIndex + 1} | {layerCount} camada(s)
            </p>
          </Card>
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
                    min="0"
                    step="0.1"
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
              rows={3}
              className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none bg-white"
            />
          </div>
          <Button variant="secondary" icon={Camera}>
            Adicionar Foto
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
        <Header
          title="Resultado da Avaliação"
          onBack={() => setCurrentStep("layers")}
        />
        <div className="bg-amber-100 p-6 space-y-4">
          <Card className="text-center bg-amber-200">
            <h2 className="text-lg font-semibold text-amber-900">
              Escore Qe-VESS da amostra:
            </h2>
            <p className="text-3xl font-bold text-amber-800">{sampleScore}</p>
            <p className="text-sm text-amber-700">Ball et al. (2017)</p>
          </Card>
          <Card title="Resumo da avaliação:">
            <div className="text-sm text-amber-800 space-y-1 bg-amber-50 p-3 rounded border">
              <p className="font-medium">{sampleName}</p>
              {location && <p>Local: {location}</p>}
              {layers.map((layer, index) => (
                <p key={index}>
                  Comprimento camada {index + 1}: {layer.length} cm; nota{" "}
                  {index + 1}: {layer.score}
                </p>
              ))}
            </div>
          </Card>
          {otherInfo && (
            <Card title="Outras informações importantes:">
              <div className="text-sm text-amber-800 bg-amber-50 p-3 rounded border italic">
                {otherInfo}
              </div>
            </Card>
          )}
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Decisão de manejo:
            </label>
            <textarea
              value={managementDecision}
              onChange={(e) => setManagementDecision(e.target.value)}
              placeholder="Descreva as decisões de manejo baseadas no escore..."
              rows={3}
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
              onClick={handleFinalize}
              variant="danger"
              className="flex-1"
            >
              FINALIZAR
            </Button>
            <Button
              onClick={handleNextSample}
              variant="secondary"
              className="flex-1"
              icon={Plus}
            >
              PRÓXIMA AMOSTRA
            </Button>
          </div>
          {samples.length > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <p className="text-center text-blue-800 text-sm">
                💡 Você já coletou {samples.length} amostra(s). Recomenda-se 3-5
                amostras por avaliação.
              </p>
            </Card>
          )}
        </div>
      </Layout>
    );
  }
  if (currentStep === "final") {
    const averageScore = calculateAverageScore();
    const evaluationTime = calculateEvaluationTime();
    const totalSamples = samples.length;
    return (
      <Layout>
        <Header title="Resumo Final" onBack={() => setCurrentStep("result")} />
        <div className="bg-amber-100 p-6 space-y-4">
          {error && (
            <Card className="bg-red-100 border-red-300">
              <p className="text-red-800 text-center">{error}</p>
            </Card>
          )}
          <Card className="text-center bg-green-100 border-green-300">
            <h2 className="text-lg font-semibold text-green-800">
              Escore Qe-VESS médio do local:
            </h2>
            <p className="text-3xl font-bold text-green-700">{averageScore}</p>
            <p className="text-sm text-green-600">Ball et al. (2017)</p>
          </Card>
          <Card title="Resumo da avaliação:">
            <div className="text-sm text-amber-800 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Total de amostras:</strong> {totalSamples}
                  </p>
                  <p>
                    <strong>Avaliador:</strong> {config.name}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Data:</strong> {formatDate(new Date())}
                  </p>
                  <p>
                    <strong>Tempo:</strong> {evaluationTime}
                  </p>
                </div>
              </div>
              <div className="border-t border-amber-300 pt-2 mt-2">
                <p>
                  <strong>Início:</strong> {startTime}
                </p>
                <p>
                  <strong>Fim:</strong> {formatTime(new Date())}
                </p>
              </div>
            </div>
          </Card>
          <Card title={`Amostras coletadas (${totalSamples}):`}>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {samples.map((sample, index) => (
                <div
                  key={index}
                  className="text-sm text-amber-800 bg-amber-50 p-2 rounded border"
                >
                  <p>
                    <strong>{sample.name}:</strong> Escore {sample.sampleScore}
                  </p>
                  {sample.location && (
                    <p className="text-xs">📍 {sample.location}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-1">
              Decisão de manejo para o local:
            </label>
            <textarea
              value={finalManagementDescription}
              onChange={(e) => setFinalManagementDescription(e.target.value)}
              placeholder="Descreva as decisões de manejo gerais para todo o local avaliado..."
              rows={4}
              className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 resize-none bg-white"
            />
          </div>
          <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
            <p className="text-sm text-orange-800">
              {getManagementDecision(averageScore)}
            </p>
          </div>
          <Button
            onClick={handleFinalSave}
            fullWidth
            disabled={loading}
            icon={Save}
            className="bg-green-600 hover:bg-green-700"
          >
            {loading ? "Salvando..." : "SALVAR E FECHAR"}
          </Button>
          <div className="text-center">
            <p className="text-xs text-amber-600">
              A avaliação será salva e você retornará ao histórico de avaliações
            </p>
          </div>
        </div>
      </Layout>
    );
  }
  return null;
};
