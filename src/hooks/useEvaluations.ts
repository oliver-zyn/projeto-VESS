import { useState, useEffect } from "react";
import type { Evaluation, EvaluationData } from "../types";
import apiService from "../services/api";
interface UseEvaluationsReturn {
  evaluations: Evaluation[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
  createEvaluation: (data: EvaluationData) => Promise<Evaluation>;
  updateEvaluation: (
    id: string,
    data: Partial<EvaluationData>
  ) => Promise<Evaluation>;
  deleteEvaluation: (id: string) => Promise<void>;
  getEvaluationById: (id: string) => Promise<Evaluation>;
  refreshEvaluations: () => Promise<void>;
  loadPage: (page: number) => Promise<void>;
}
export const useEvaluations = (
  initialPage = 1,
  limit = 10
): UseEvaluationsReturn => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] =
    useState<UseEvaluationsReturn["pagination"]>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const loadEvaluations = async (page = currentPage) => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Carregando avaliações da API..."); 
      const result = await apiService.getEvaluations(page, limit);
      console.log("📊 Resultado da API:", result); 
      console.log("📋 Avaliações recebidas:", result.evaluations); 
      console.log("📄 Paginação:", result.pagination); 
      setEvaluations(result.evaluations || []);
      setPagination({
        ...result.pagination,
        hasNextPage: result.pagination.currentPage < result.pagination.totalPages,
        hasPreviousPage: result.pagination.currentPage > 1
      });
      setCurrentPage(page);
      console.log(
        `✅ ${result.evaluations?.length || 0} avaliações carregadas`
      );
    } catch (err) {
      console.error("❌ Erro ao carregar avaliações:", err); 
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao carregar avaliações";
      setError(errorMessage);
      setEvaluations([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };
  const createEvaluation = async (
    data: EvaluationData
  ): Promise<Evaluation> => {
    try {
      setError(null);
      console.log("➕ Criando nova avaliação:", data); 
      const newEvaluation = await apiService.createEvaluation(data);
      console.log("✅ Avaliação criada:", newEvaluation); 
      setEvaluations((prev) => [newEvaluation, ...prev]);
      return newEvaluation;
    } catch (err) {
      console.error("❌ Erro ao criar avaliação:", err); 
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao criar avaliação";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };
  const updateEvaluation = async (
    id: string,
    data: Partial<EvaluationData>
  ): Promise<Evaluation> => {
    try {
      setError(null);
      console.log("✏️ Atualizando avaliação:", id, data); 
      const updatedEvaluation = await apiService.updateEvaluation(id, data);
      console.log("✅ Avaliação atualizada:", updatedEvaluation); 
      setEvaluations((prev) =>
        prev.map((evaluation) => (evaluation.id === id ? updatedEvaluation : evaluation))
      );
      return updatedEvaluation;
    } catch (err) {
      console.error("❌ Erro ao atualizar avaliação:", err); 
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao atualizar avaliação";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };
  const deleteEvaluation = async (id: string): Promise<void> => {
    try {
      setError(null);
      console.log("🗑️ Deletando avaliação:", id); 
      await apiService.deleteEvaluation(id);
      console.log("✅ Avaliação deletada:", id); 
      setEvaluations((prev) => prev.filter((evaluation) => evaluation.id !== id));
      if (
        pagination &&
        evaluations.length === 1 &&
        pagination.currentPage > 1
      ) {
        await loadPage(pagination.currentPage - 1);
      }
    } catch (err) {
      console.error("❌ Erro ao deletar avaliação:", err); 
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao deletar avaliação";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };
  const getEvaluationById = async (id: string): Promise<Evaluation> => {
    try {
      setError(null);
      console.log("🔍 Buscando avaliação por ID:", id); 
      const evaluation = await apiService.getEvaluationById(id);
      console.log("✅ Avaliação encontrada:", evaluation); 
      return evaluation;
    } catch (err) {
      console.error("❌ Erro ao buscar avaliação:", err); 
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao buscar avaliação";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };
  const refreshEvaluations = async (): Promise<void> => {
    console.log("🔄 Atualizando lista de avaliações..."); 
    await loadEvaluations(currentPage);
  };
  const loadPage = async (page: number): Promise<void> => {
    console.log("📄 Carregando página:", page); 
    await loadEvaluations(page);
  };
  useEffect(() => {
    console.log("🚀 Inicializando hook useEvaluations..."); 
    loadEvaluations();
  }, []); 
  return {
    evaluations,
    loading,
    error,
    pagination,
    createEvaluation,
    updateEvaluation,
    deleteEvaluation,
    getEvaluationById,
    refreshEvaluations,
    loadPage,
  };
};
