// src/screens/HistoryScreen.tsx
import React from "react";
import { Calendar, MapPin, User } from "lucide-react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Card } from "../components/ui/Card";
import type { Evaluation } from "../types";

interface HistoryScreenProps {
  onBack: () => void;
  evaluations?: Evaluation[];
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  onBack,
  evaluations = [],
}) => {
  return (
    <Layout>
      <Header title="Minhas Avaliações" onBack={onBack} />

      <div className="bg-amber-100 p-6 space-y-4">
        {evaluations.length === 0 ? (
          <Card>
            <div className="text-center py-8 text-amber-600">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Nenhuma avaliação realizada</p>
              <p className="text-sm mt-2">
                Suas avaliações aparecerão aqui após serem concluídas
              </p>
            </div>
          </Card>
        ) : (
          evaluations.map((evaluation) => (
            <Card
              key={evaluation.id}
              variant="clickable"
              className="hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-amber-900">
                    {evaluation.name}
                  </h3>
                  <span className="text-lg font-bold text-amber-700">
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
                  </div>

                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
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
              </div>
            </Card>
          ))
        )}
      </div>
    </Layout>
  );
};
