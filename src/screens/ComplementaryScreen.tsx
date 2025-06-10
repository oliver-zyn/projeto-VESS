import React, { useState } from "react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

interface ComplementaryScreenProps {
  onBack: () => void;
}

export const ComplementaryScreen: React.FC<ComplementaryScreenProps> = ({
  onBack,
}) => {
  const [selectedSoilType, setSelectedSoilType] = useState<
    "clayey" | "sandy" | null
  >(null);

  const exampleScores = [
    { score: "1,0", description: "Estrutura friável" },
    { score: "1,5", description: "Estrutura friável a intacta" },
    { score: "2,5", description: "Estrutura intacta a firme" },
    { score: "3,5", description: "Estrutura firme a compacta" },
    { score: "4,0", description: "Estrutura compacta" },
    { score: "4,5", description: "Estrutura compacta a muito compacta" },
    { score: "5,0", description: "Estrutura muito compacta" },
  ];

  return (
    <Layout>
      <Header title="Informações Complementares" onBack={onBack} />

      <div className="bg-amber-100 p-6 space-y-4">
        <Card title="Escores Intermediários">
          <p className="text-amber-800 leading-relaxed mb-4">
            A nota da qualidade estrutural do solo pode ser atribuída entre
            categorias se a camada apresentar características das duas.
          </p>
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 mb-4">
            <p className="text-blue-800 text-sm">
              💡 <strong>Exemplo:</strong> Um escore VESS de 1,5 pode ser
              atribuído se a camada apresentar ≈50% com qualidade estrutural 1,
              mas também apresentar agregados com qualidade estrutural 2.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {exampleScores.map((example) => (
              <div
                key={example.score}
                className="bg-amber-50 p-3 rounded border border-amber-200"
              >
                <div className="font-semibold text-amber-900">
                  Qe {example.score}
                </div>
                <div className="text-sm text-amber-700">
                  {example.description}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Avaliação por Tipo de Solo">
          <p className="text-amber-800 mb-4">
            As figuras abaixo são exemplos de solos com diferentes escores
            Qe-VESS para auxiliar o usuário na atribuição da nota.
          </p>
          <div className="bg-orange-100 border border-orange-300 rounded-lg p-3 mb-4">
            <p className="text-orange-800 text-sm">
              ⚠️ <strong>Importante:</strong> A atribuição da nota não foi
              realizada somente de forma visual, mas tátil também.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() =>
                setSelectedSoilType(
                  selectedSoilType === "clayey" ? null : "clayey"
                )
              }
              variant={selectedSoilType === "clayey" ? "primary" : "secondary"}
              fullWidth
            >
              🏺 Solo Argiloso
            </Button>
            <Button
              onClick={() =>
                setSelectedSoilType(
                  selectedSoilType === "sandy" ? null : "sandy"
                )
              }
              variant={selectedSoilType === "sandy" ? "primary" : "secondary"}
              fullWidth
            >
              🏖️ Solo Arenoso
            </Button>
          </div>
        </Card>

        {/* Exemplos visuais por tipo de solo */}
        {selectedSoilType && (
          <Card
            title={`Exemplos - Solo ${
              selectedSoilType === "clayey" ? "Argiloso" : "Arenoso"
            }`}
            className="border-2 border-amber-400"
          >
            <div className="grid grid-cols-2 gap-4">
              {exampleScores.map((example) => (
                <div
                  key={example.score}
                  className="bg-white p-4 rounded border border-gray-200"
                >
                  <div className="text-center mb-3">
                    <h4 className="font-semibold text-gray-800">
                      Qe-VESS {example.score}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {example.description}
                    </p>
                  </div>
                  <div className="bg-gray-100 h-24 rounded flex items-center justify-center">
                    <p className="text-gray-500 text-sm text-center">
                      📸 Exemplo{" "}
                      {selectedSoilType === "clayey" ? "argiloso" : "arenoso"}
                      <br />
                      Qe {example.score}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card title="Dicas Importantes para Avaliação">
          <div className="space-y-4">
            <div className="bg-green-100 border border-green-300 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">
                ✅ Boas Práticas
              </h4>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Sempre compare com área de referência (mata nativa)</li>
                <li>• Avalie 3-5 pontos em área homogênea</li>
                <li>• Use a mesma pessoa para avaliar (consistência)</li>
                <li>• Considere umidade adequada do solo</li>
                <li>• Documente condições da avaliação</li>
              </ul>
            </div>

            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">
                ⚠️ Cuidados Especiais
              </h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>
                  • Solo muito seco: dificulta extração de amostra intacta
                </li>
                <li>
                  • Solo muito úmido: pode mascarar características estruturais
                </li>
                <li>• Solos argilosos: aguardar 4 dias após chuva &gt; 50mm</li>
                <li>• Profundidades &gt; 25cm: utilizar SubVESS</li>
                <li>• Presença de camadas distintas: avaliar separadamente</li>
              </ul>
            </div>

            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                📝 Informações Úteis para Histórico
              </h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Amostra muito úmida/muito seca</li>
                <li>• Dificuldade para cavar trincheira/extrair amostra</li>
                <li>• Raízes achatadas/tortuosas</li>
                <li>• Época da avaliação (pré-plantio/pós-colheita)</li>
                <li>• Tipo de solo (argiloso/arenoso/médio)</li>
                <li>• Cultura anterior e manejo utilizado</li>
                <li>• Condições climáticas dos últimos dias</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card title="Variações Regionais e Adaptações">
          <div className="space-y-3">
            <div className="bg-purple-100 border border-purple-300 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">
                🌍 Adaptações Regionais
              </h4>
              <p className="text-purple-800 text-sm">
                O VESS foi testado para uma grande variedade de solos
                globalmente. Pequenas adaptações podem ser necessárias
                considerando características específicas dos solos brasileiros.
              </p>
            </div>

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                📚 Validação Científica
              </h4>
              <p className="text-gray-800 text-sm">
                A versão utilizada neste aplicativo foi ajustada por Guimarães
                et al. (2011) especificamente para condições brasileiras,
                baseada na metodologia original de Ball et al. (2007).
              </p>
            </div>
          </div>
        </Card>

        <Card title="Recursos Adicionais">
          <div className="space-y-3">
            <div className="text-amber-800 space-y-2">
              <p className="flex items-center">
                🌐{" "}
                <a
                  href="https://www.sruc.ac.uk/vess"
                  className="text-amber-600 underline ml-2"
                >
                  Site oficial VESS (Inglês)
                </a>
              </p>
              <p className="flex items-center">
                🇧🇷{" "}
                <a
                  href="http://paginapessoal.utfpr.edu.br/rachelguimaraes/vess"
                  className="text-amber-600 underline ml-2"
                >
                  Página VESS Brasil (Português)
                </a>
              </p>
              <p className="flex items-center">
                📧{" "}
                <a
                  href="mailto:rachelguimaraes@utfpr.edu.br"
                  className="text-amber-600 underline ml-2"
                >
                  Contato para dúvidas
                </a>
              </p>
            </div>
          </div>
        </Card>

        {!selectedSoilType && (
          <div className="text-center py-6">
            <p className="text-amber-600 italic">
              👆 Selecione um tipo de solo acima para ver exemplos visuais
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};
