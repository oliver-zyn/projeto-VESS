import React from "react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Card } from "../components/ui/Card";

interface ExpositionScreenProps {
  onBack: () => void;
}

export const ExpositionScreen: React.FC<ExpositionScreenProps> = ({
  onBack,
}) => {
  return (
    <Layout>
      <Header title="Exposição dos Agregados" onBack={onBack} />

      <div className="bg-amber-100 p-6 space-y-4">
        <Card title="Como Expor os Agregados">
          <p className="text-amber-800 leading-relaxed mb-4">
            Delicadamente manipule a amostra. Segure a amostra por baixo e abra
            como um livro, respeitando as linhas de fratura dos agregados.
          </p>
          <p className="text-amber-800 leading-relaxed">
            Observe se há camadas que se diferenciam pelo tamanho e/ou forma dos
            agregados e faça a avaliação individual dessas camadas.
          </p>
        </Card>

        <Card title="Procedimento Passo a Passo">
          <div className="space-y-3 text-amber-800">
            <div className="flex items-start space-x-3">
              <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <p>
                <strong>Segurar a amostra:</strong> Pegue a amostra pela parte
                inferior, apoiando bem para não quebrar incorretamente.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <p>
                <strong>Abrir como livro:</strong> Separe delicadamente a
                amostra seguindo as linhas naturais de fratura dos agregados.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <p>
                <strong>Identificar camadas:</strong> Observe diferenças no
                tamanho, forma e características dos agregados em diferentes
                profundidades.
              </p>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                4
              </div>
              <p>
                <strong>Medir camadas:</strong> Determine o comprimento
                (espessura) de cada camada distinta identificada.
              </p>
            </div>
          </div>
        </Card>

        <Card title="Pontos Importantes">
          <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
            <div className="space-y-2 text-orange-800">
              <p className="flex items-start">
                <span className="text-orange-600 mr-2">⚠️</span>
                <strong>Cuidado:</strong> Não force a quebra dos agregados.
                Respeite sempre as linhas naturais de fratura.
              </p>
              <p className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <strong>Dica:</strong> Se os agregados não se separam
                facilmente, a amostra pode estar muito úmida ou muito seca.
              </p>
              <p className="flex items-start">
                <span className="text-blue-600 mr-2">💡</span>
                <strong>Lembre-se:</strong> Cada camada com características
                diferentes deve ser avaliada separadamente.
              </p>
            </div>
          </div>
        </Card>

        <Card title="O que Observar em Cada Camada">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-amber-50 p-4 rounded border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">
                🔍 Tamanho dos Agregados
              </h4>
              <p className="text-sm text-amber-800">
                Varie de pequenos (&lt; 6mm) até muito grandes (&gt; 10cm)
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">
                🏗️ Forma dos Agregados
              </h4>
              <p className="text-sm text-amber-800">
                Podem ser arredondados, angulares ou sub-angulares
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">
                🕳️ Porosidade Visível
              </h4>
              <p className="text-sm text-amber-800">
                Presença de poros e fissuras dentro e entre os agregados
              </p>
            </div>

            <div className="bg-amber-50 p-4 rounded border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-2">
                🌱 Presença de Raízes
              </h4>
              <p className="text-sm text-amber-800">
                Raízes podem estar dentro dos agregados ou entre eles
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-center py-8 text-amber-600">
            <p>📸 Imagem demonstrativa da exposição</p>
            <p className="text-sm mt-2">
              (Adicione imagens em public/images/exposition/)
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
