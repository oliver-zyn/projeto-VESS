import React, { useState } from "react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Card } from "../components/ui/Card";
import { SCORE_DESCRIPTIONS } from "../utils/constants";

interface ScoresScreenProps {
  onBack: () => void;
}

export const ScoresScreen: React.FC<ScoresScreenProps> = ({ onBack }) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const scores = [
    { value: 1, label: "Qe 1 - Friável", color: "bg-green-500" },
    { value: 2, label: "Qe 2 - Intacto", color: "bg-green-400" },
    { value: 3, label: "Qe 3 - Firme", color: "bg-yellow-500" },
    { value: 4, label: "Qe 4 - Compacto", color: "bg-orange-500" },
    { value: 5, label: "Qe 5 - Muito Compacto", color: "bg-red-500" },
  ];

  return (
    <Layout>
      <Header title="Escores VESS" onBack={onBack} />

      <div className="bg-amber-100 p-6 space-y-4">
        <Card title="Carta dos Escores Qe-VESS">
          <p className="text-amber-800 leading-relaxed mb-4">
            Compare a amostra com as descrições e fotos representadas a seguir e
            determine o que mais se assemelha para cada camada da amostra.
          </p>
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
            <p className="text-blue-800 text-sm">
              💡 <strong>Dica:</strong> Para diferenciar um escore 3 de um 4,
              faça o teste de mão: se o torrão romper é escore 3, se não romper
              é escore 4.
            </p>
          </div>
        </Card>

        {/* Botões para selecionar escores */}
        <Card title="Selecione um Escore para Ver Detalhes">
          <div className="grid grid-cols-1 gap-2">
            {scores.map((score) => (
              <button
                key={score.value}
                onClick={() =>
                  setSelectedScore(
                    selectedScore === score.value ? null : score.value
                  )
                }
                className={`p-4 rounded-lg text-white font-semibold transition-all ${
                  score.color
                } ${
                  selectedScore === score.value
                    ? "ring-4 ring-amber-400 scale-105"
                    : "hover:scale-102"
                } shadow-md`}
              >
                {score.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Detalhes do escore selecionado */}
        {selectedScore &&
          SCORE_DESCRIPTIONS[
            selectedScore as keyof typeof SCORE_DESCRIPTIONS
          ] && (
            <Card
              title={
                SCORE_DESCRIPTIONS[
                  selectedScore as keyof typeof SCORE_DESCRIPTIONS
                ].title
              }
              className="border-2 border-amber-400"
            >
              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">
                    📋 Descrição:
                  </h4>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    {
                      SCORE_DESCRIPTIONS[
                        selectedScore as keyof typeof SCORE_DESCRIPTIONS
                      ].description
                    }
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    🎯 Característica Distintiva:
                  </h4>
                  <p className="text-blue-800 text-sm font-medium">
                    {
                      SCORE_DESCRIPTIONS[
                        selectedScore as keyof typeof SCORE_DESCRIPTIONS
                      ].characteristic
                    }
                  </p>
                </div>

                {/* Exemplos visuais */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-gray-200 text-center">
                    <h5 className="font-medium text-gray-800 mb-2">
                      Solo Argiloso
                    </h5>
                    <div className="bg-gray-100 p-8 rounded">
                      <p className="text-gray-600 text-sm">
                        📸 Exemplo Qe{selectedScore}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200 text-center">
                    <h5 className="font-medium text-gray-800 mb-2">
                      Solo Arenoso
                    </h5>
                    <div className="bg-gray-100 p-8 rounded">
                      <p className="text-gray-600 text-sm">
                        📸 Exemplo Qe{selectedScore}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

        {/* Testes auxiliares */}
        <Card title="Testes Auxiliares">
          <div className="space-y-4">
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
              <h4 className="font-semibold text-orange-900 mb-2">
                ✋ Teste de Mão
              </h4>
              <p className="text-orange-800 text-sm">
                Para diferenciar escores 3 e 4: pressione o agregado com as
                mãos. Se romper = Qe3, se não romper = Qe4.
              </p>
              <p className="text-orange-700 text-xs mt-2 italic">
                ⚠️ Atenção: considere a umidade do solo para este teste.
              </p>
            </div>

            <div className="bg-purple-100 border border-purple-300 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">
                🔬 Teste de Redução dos Agregados
              </h4>
              <p className="text-purple-800 text-sm">
                Quebre agregados grandes (~1,5 cm) para confirmar a estrutura
                interna e validar o escore atribuído.
              </p>
            </div>
          </div>
        </Card>

        {/* Dicas importantes */}
        <Card title="Dicas Importantes">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="text-green-600 text-lg">✓</span>
              <p className="text-amber-800 text-sm">
                A avaliação pode ser feita entre categorias (ex: 1,5; 2,5; 3,5
                etc.) quando a amostra tem características mistas.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-blue-600 text-lg">👁️</span>
              <p className="text-amber-800 text-sm">
                A atribuição da nota deve ser feita de forma visual{" "}
                <strong>E</strong> tátil, não apenas visual.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-orange-600 text-lg">📐</span>
              <p className="text-amber-800 text-sm">
                Avalie cada camada separadamente se houver diferenças
                significativas na estrutura.
              </p>
            </div>
          </div>
        </Card>

        {!selectedScore && (
          <div className="text-center py-6">
            <p className="text-amber-600 italic">
              👆 Selecione um escore acima para ver detalhes específicos
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};
