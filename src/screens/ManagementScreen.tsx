import React, { useState } from "react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Card } from "../components/ui/Card";
import { MANAGEMENT_DECISIONS } from "../utils/constants";

interface ManagementScreenProps {
  onBack: () => void;
}

export const ManagementScreen: React.FC<ManagementScreenProps> = ({
  onBack,
}) => {
  const [selectedRange, setSelectedRange] = useState<string | null>(null);

  const scoreRanges = [
    {
      range: "1-2.9",
      label: "Boa Qualidade Estrutural",
      color: "bg-green-500",
      textColor: "text-green-800",
      bgColor: "bg-green-100",
      borderColor: "border-green-300",
      decision: MANAGEMENT_DECISIONS.good,
    },
    {
      range: "3-3.9",
      label: "Qualidade Estrutural Razoável",
      color: "bg-yellow-500",
      textColor: "text-yellow-800",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
      decision: MANAGEMENT_DECISIONS.reasonable,
    },
    {
      range: "4-5",
      label: "Qualidade Estrutural Ruim",
      color: "bg-red-500",
      textColor: "text-red-800",
      bgColor: "bg-red-100",
      borderColor: "border-red-300",
      decision: MANAGEMENT_DECISIONS.poor,
    },
  ];

  return (
    <Layout>
      <Header title="Decisão de Manejo" onBack={onBack} />

      <div className="bg-amber-100 p-6 space-y-4">
        <Card title="Como Usar o VESS para Decisões de Manejo">
          <p className="text-amber-800 leading-relaxed mb-4">
            O método VESS fornece uma avaliação da qualidade estrutural atual do
            solo e permite decisões de manejo que visam melhorar ou manter a
            qualidade do solo.
          </p>
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
            <p className="text-blue-800 text-sm">
              📊 <strong>Recomendação:</strong> Para aliar a VESS à decisão de
              manejo, são recomendadas múltiplas amostras (3 a 5), avaliadas
              preferencialmente por um único avaliador.
            </p>
          </div>
        </Card>

        {/* Seletor de faixas de escore */}
        <Card title="Selecione a Faixa de Escore VESS">
          <div className="space-y-3">
            {scoreRanges.map((range) => (
              <button
                key={range.range}
                onClick={() =>
                  setSelectedRange(
                    selectedRange === range.range ? null : range.range
                  )
                }
                className={`w-full p-4 rounded-lg text-white font-semibold transition-all ${
                  range.color
                } ${
                  selectedRange === range.range
                    ? "ring-4 ring-amber-400 scale-105"
                    : "hover:scale-102"
                } shadow-md`}
              >
                <div className="flex justify-between items-center">
                  <span>Escores {range.range}</span>
                  <span className="text-sm opacity-90">{range.label}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Detalhes da faixa selecionada */}
        {selectedRange && (
          <Card
            title={`Escores VESS ${selectedRange}`}
            className="border-2 border-amber-400"
          >
            {(() => {
              const range = scoreRanges.find((r) => r.range === selectedRange);
              if (!range) return null;

              return (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg ${range.bgColor} ${range.borderColor} border`}
                  >
                    <h4 className={`font-semibold mb-2 ${range.textColor}`}>
                      📋 Recomendação de Manejo:
                    </h4>
                    <p className={`text-sm leading-relaxed ${range.textColor}`}>
                      {range.decision}
                    </p>
                  </div>

                  {/* Detalhes específicos por faixa */}
                  {selectedRange === "1-2.9" && (
                    <div className="space-y-3">
                      <div className="bg-green-50 p-4 rounded border border-green-200">
                        <h5 className="font-semibold text-green-900 mb-2">
                          ✅ Características:
                        </h5>
                        <ul className="text-green-800 text-sm space-y-1">
                          <li>• Solo com boa qualidade estrutural</li>
                          <li>• Não requer mudanças no manejo atual</li>
                          <li>• Manter as práticas existentes</li>
                          <li>• Monitoramento periódico recomendado</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedRange === "3-3.9" && (
                    <div className="space-y-3">
                      <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                        <h5 className="font-semibold text-yellow-900 mb-2">
                          ⚠️ Estratégias de Melhoria:
                        </h5>
                        <ul className="text-yellow-800 text-sm space-y-1">
                          <li>
                            • Rotação de culturas com sistema radicular
                            abundante
                          </li>
                          <li>• Culturas com penetração profunda</li>
                          <li>• Maximizar produção de matéria seca</li>
                          <li>• Aumentar concentração de matéria orgânica</li>
                          <li>• Minimizar compactação do solo</li>
                          <li>• Reduzir tráfego de máquinas pesadas</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedRange === "4-5" && (
                    <div className="space-y-3">
                      <div className="bg-red-50 p-4 rounded border border-red-200">
                        <h5 className="font-semibold text-red-900 mb-2">
                          🚨 Intervenção Urgente:
                        </h5>
                        <ul className="text-red-800 text-sm space-y-1">
                          <li>• Danos graves às funções do solo</li>
                          <li>• Capacidade de suporte comprometida</li>
                          <li>• Mudança de manejo a curto prazo</li>
                          <li>• Melhorias para próxima cultura</li>
                          <li>• Consórcios entre safras</li>
                          <li>• Possível revolvimento mecânico</li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 p-4 rounded border border-orange-200">
                        <h5 className="font-semibold text-orange-900 mb-2">
                          🔍 Sinais de Alerta:
                        </h5>
                        <ul className="text-orange-800 text-sm space-y-1">
                          <li>• Acúmulo superficial de água</li>
                          <li>• Diminuição no rendimento das culturas</li>
                          <li>• Evidência de estresse nas plantas</li>
                          <li>• Profundidade de enraizamento limitada</li>
                          <li>• Problemas de infiltração</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </Card>
        )}

        {/* Recomendações gerais */}
        <Card title="Recomendações Gerais">
          <div className="space-y-4">
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                📊 Avaliação Integrada
              </h4>
              <p className="text-blue-800 text-sm">
                Idealmente, a decisão de manejo deve ser baseada em um conjunto
                de dados de qualidade do solo, incluindo medições de densidade,
                porosidade, resistência à penetração e dados biológicos.
              </p>
            </div>

            <div className="bg-purple-100 border border-purple-300 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">
                🎯 Planejamento Temporal
              </h4>
              <div className="text-purple-800 text-sm space-y-2">
                <p>
                  <strong>Curto prazo (Qe 4-5):</strong> Intervenções para a
                  próxima safra
                </p>
                <p>
                  <strong>Longo prazo (Qe 3-3.9):</strong> Mudanças graduais no
                  sistema de manejo
                </p>
                <p>
                  <strong>Manutenção (Qe 1-2.9):</strong> Monitoramento e
                  continuidade das práticas
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center text-amber-700">
            <p className="text-sm italic">
              📚 Fonte: Ball et al. (2017) - Visual Evaluation of Soil Structure
            </p>
          </div>
        </Card>

        {!selectedRange && (
          <div className="text-center py-6">
            <p className="text-amber-600 italic">
              👆 Selecione uma faixa de escore acima para ver recomendações
              específicas
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};
