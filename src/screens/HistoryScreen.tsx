import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  User,
  RefreshCw,
  Trash2,
  Eye,
  ArrowLeft,
  BarChart3,
} from "lucide-react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import type { Evaluation } from "../types";
import { useEvaluations } from "../hooks/useEvaluations";
interface HistoryScreenProps {
  onBack: () => void;
  evaluations: Evaluation[];
  loading: boolean;
}
export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  onBack,
  evaluations,
  loading,
}) => {
  const {
    error,
    pagination,
    deleteEvaluation,
    refreshEvaluations,
    loadPage,
    getEvaluationById,
  } = useEvaluations();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingEvaluation, setViewingEvaluation] = useState<Evaluation | null>(
    null
  );
  const [loadingDetails, setLoadingDetails] = useState(false);
  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja deletar a avaliação "${name}"?`)) {
      try {
        setDeletingId(id);
        await deleteEvaluation(id);
      } catch (error) {
        alert(
          `Erro ao deletar avaliação: ${
            error instanceof Error ? error.message : "Erro desconhecido"
          }`
        );
      } finally {
        setDeletingId(null);
      }
    }
  };
  const handleRefresh = async () => {
    await refreshEvaluations();
  };
  const handleLoadPage = async (page: number) => {
    await loadPage(page);
  };
  const handleViewDetails = async (evaluationId: string) => {
    try {
      setLoadingDetails(true);
      const detailedEvaluation = await getEvaluationById(evaluationId);
      setViewingEvaluation(detailedEvaluation);
    } catch (error) {
      alert(
        `Erro ao carregar detalhes da avaliação: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
    } finally {
      setLoadingDetails(false);
    }
  };
  if (viewingEvaluation) {
    const calculateEvaluationTime = () => {
      if (!viewingEvaluation.endTime) return "Não finalizada";
      const start = new Date(`2024-01-01 ${viewingEvaluation.startTime}`);
      const end = new Date(`2024-01-01 ${viewingEvaluation.endTime}`);
      const diffMs = end.getTime() - start.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const hours = Math.floor(diffMins / 60);
      const minutes = diffMins % 60;
      if (hours > 0) {
        return `${hours}h ${minutes}min`;
      }
      return `${minutes}min`;
    };
    return (
      <Layout>
        <Header
          title="Detalhes da Avaliação"
          onBack={() => setViewingEvaluation(null)}
        />
        <div className="bg-amber-100 p-6 space-y-4">
          <Card className="bg-amber-200">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-amber-900">
                {viewingEvaluation.name}
              </h2>
              <div className="text-2xl font-bold text-green-700">
                Escore Médio: {viewingEvaluation.averageScore}
              </div>
              <p className="text-sm text-amber-700">Ball et al. (2017)</p>
            </div>
          </Card>
          <Card title="Informações Gerais">
            <div className="grid grid-cols-2 gap-4 text-sm text-amber-800">
              <div>
                <p>
                  <strong>Data:</strong> {viewingEvaluation.date}
                </p>
                <p>
                  <strong>Avaliador:</strong> {viewingEvaluation.evaluator}
                </p>
                <p>
                  <strong>Amostras:</strong> {viewingEvaluation.samples.length}
                </p>
              </div>
              <div>
                <p>
                  <strong>Início:</strong> {viewingEvaluation.startTime}
                </p>
                <p>
                  <strong>Fim:</strong> {viewingEvaluation.endTime || "N/A"}
                </p>
                <p>
                  <strong>Duração:</strong> {calculateEvaluationTime()}
                </p>
              </div>
            </div>
          </Card>
          {viewingEvaluation.managementDescription && (
            <Card title="Decisão de Manejo para o Local">
              <div className="text-sm text-amber-800 bg-orange-50 p-3 rounded border border-orange-200">
                {viewingEvaluation.managementDescription}
              </div>
            </Card>
          )}
          <Card
            title={`Amostras Coletadas (${viewingEvaluation.samples.length})`}
          >
            <div className="space-y-4">
              {viewingEvaluation.samples.map((sample, sampleIndex) => (
                <div
                  key={sampleIndex}
                  className="border border-amber-300 rounded-lg p-4 bg-white"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-amber-900">
                      {sample.name}
                    </h4>
                    <span className="text-lg font-bold text-green-600">
                      {sample.sampleScore || "N/A"}
                    </span>
                  </div>
                  {sample.location && (
                    <div className="flex items-center text-sm text-amber-700 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{sample.location}</span>
                    </div>
                  )}
                  <div className="mb-3">
                    <h5 className="text-sm font-medium text-amber-800 mb-2">
                      Camadas ({sample.layers.length}):
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {sample.layers
                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                        .map((layer, layerIndex) => (
                          <div
                            key={layerIndex}
                            className="flex justify-between items-center text-xs bg-amber-50 p-2 rounded border"
                          >
                            <span>Camada {layer.order || layerIndex + 1}</span>
                            <span>{layer.length} cm</span>
                            <span className="font-medium">
                              Nota: {layer.score}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                  {sample.otherInfo && (
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-amber-800 mb-1">
                        Outras informações:
                      </h5>
                      <p className="text-xs text-amber-700 italic bg-amber-50 p-2 rounded border">
                        {sample.otherInfo}
                      </p>
                    </div>
                  )}
                  {sample.managementDecision && (
                    <div>
                      <h5 className="text-sm font-medium text-amber-800 mb-1">
                        Decisão de manejo:
                      </h5>
                      <p className="text-xs text-amber-700 bg-blue-50 p-2 rounded border border-blue-200">
                        {sample.managementDecision}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
          <Button
            onClick={() => setViewingEvaluation(null)}
            fullWidth
            variant="secondary"
            icon={ArrowLeft}
          >
            Voltar para o Histórico
          </Button>
        </div>
      </Layout>
    );
  }
  if (loading && evaluations.length === 0) {
    return (
      <Layout>
        <Header title="Minhas Avaliações" onBack={onBack} />
        <div className="bg-amber-100 p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-amber-800">Carregando avaliações...</p>
          </div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Header title="Minhas Avaliações" onBack={onBack} />
      <div className="bg-amber-100 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-amber-900">
            {pagination
              ? `${pagination.totalItems} avaliação(ões)`
              : "Suas Avaliações"}
          </h2>
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={handleRefresh}
            disabled={loading}
          >
            Atualizar
          </Button>
        </div>
        {error && (
          <Card>
            <div className="text-center py-4 text-red-600">
              <p className="font-medium">Erro ao carregar avaliações</p>
              <p className="text-sm mt-1">{error}</p>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleRefresh}
                className="mt-3"
              >
                Tentar novamente
              </Button>
            </div>
          </Card>
        )}
        {!loading && !error && evaluations.length === 0 && (
          <Card>
            <div className="text-center py-8 text-amber-600">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Nenhuma avaliação realizada</p>
              <p className="text-sm mt-2">
                Suas avaliações aparecerão aqui após serem concluídas
              </p>
            </div>
          </Card>
        )}
        {evaluations.map((evaluation) => (
          <Card
            key={evaluation.id}
            className="hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-amber-900 flex-1">
                  {evaluation.name}
                </h3>
                <span className="text-lg font-bold text-amber-700 ml-2">
                  {evaluation.averageScore}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm text-amber-700">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{evaluation.evaluator}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {evaluation.date} - {evaluation.startTime}
                  </span>
                  {evaluation.endTime && <span> até {evaluation.endTime}</span>}
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  <span>{evaluation.samples.length} amostra(s)</span>
                </div>
              </div>
              {evaluation.managementDescription && (
                <div className="mt-3 p-3 bg-amber-50 rounded border border-amber-200">
                  <p className="text-sm text-amber-800">
                    {evaluation.managementDescription.length > 100
                      ? `${evaluation.managementDescription.substring(
                          0,
                          100
                        )}...`
                      : evaluation.managementDescription}
                  </p>
                </div>
              )}
              <div className="flex space-x-2 pt-2 border-t border-amber-200">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Eye}
                  className="flex-1"
                  onClick={() => handleViewDetails(evaluation.id)}
                  disabled={loadingDetails}
                >
                  {loadingDetails ? "Carregando..." : "Ver detalhes"}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  icon={Trash2}
                  disabled={deletingId === evaluation.id}
                  onClick={() => handleDelete(evaluation.id, evaluation.name)}
                >
                  {deletingId === evaluation.id ? "Deletando..." : "Deletar"}
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {pagination && pagination.totalPages > 1 && (
          <Card>
            <div className="flex justify-between items-center">
              <Button
                variant="secondary"
                size="sm"
                disabled={!pagination.hasPreviousPage || loading}
                onClick={() => handleLoadPage(pagination.currentPage - 1)}
              >
                Anterior
              </Button>
              <span className="text-sm text-amber-800">
                Página {pagination.currentPage} de {pagination.totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={!pagination.hasNextPage || loading}
                onClick={() => handleLoadPage(pagination.currentPage + 1)}
              >
                Próxima
              </Button>
            </div>
          </Card>
        )}
        {loading && evaluations.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-2"></div>
              <p className="text-amber-800">Carregando...</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
