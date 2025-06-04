import type { Layer, Sample, Evaluation } from "../types";
import { MANAGEMENT_DECISIONS } from "../utils/constants";

export const calculateSampleScore = (layers: Layer[]): number => {
  if (layers.length === 0) return 0;

  const totalLength = layers.reduce((sum, layer) => sum + layer.length, 0);
  if (totalLength === 0) return 0;

  const weightedSum = layers.reduce(
    (sum, layer) => sum + layer.score * layer.length,
    0
  );
  return Number((weightedSum / totalLength).toFixed(1));
};

export const calculateEvaluationAverageScore = (samples: Sample[]): number => {
  if (samples.length === 0) return 0;

  const totalScore = samples.reduce((sum, sample) => {
    const sampleScore = calculateSampleScore(sample.layers);
    return sum + sampleScore;
  }, 0);

  return Number((totalScore / samples.length).toFixed(1));
};

export const getManagementDecision = (score: number): string => {
  if (score >= 1 && score < 3) {
    return MANAGEMENT_DECISIONS.good;
  } else if (score >= 3 && score < 4) {
    return MANAGEMENT_DECISIONS.reasonable;
  } else if (score >= 4) {
    return MANAGEMENT_DECISIONS.poor;
  }
  return "";
};

export const generateEvaluationSummary = (evaluation: Evaluation): string => {
  const totalSamples = evaluation.samples.length;
  const startTime = evaluation.startTime;
  const endTime =
    evaluation.endTime ||
    new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return `${totalSamples} amostras\nAvaliador: ${evaluation.evaluator}\nData das avaliações: ${evaluation.date}\nHora: ${startTime} - ${endTime}`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
