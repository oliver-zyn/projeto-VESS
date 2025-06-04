import React from "react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Card } from "../components/ui/Card";

interface AboutScreenProps {
  onBack: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  return (
    <Layout>
      <Header title="O que é o VESS" onBack={onBack} />

      <div className="bg-amber-100 p-6 space-y-4">
        <Card title="Definição">
          <p className="text-amber-800 leading-relaxed">
            A Avaliação Visual da Estrutura do Solo (VESS) é um teste de pá em
            que se avalia a qualidade estrutural (Qe) do solo de forma visual e
            tátil. Os critérios avaliados para a atribuição de uma nota são
            presença de poros, tamanho, resistência e forma de agregados,
            presença ou não de raízes, entre outras.
          </p>
        </Card>

        <Card title="Escala de Avaliação">
          <p className="text-amber-800 leading-relaxed">
            A nota pode variar entre <strong>Qe1 (ótimo)</strong> a{" "}
            <strong>Qe5 (ruim)</strong>. A partir dessa nota, pode-se realizar
            inferências e tomar decisões em relação ao manejo do solo.
          </p>
        </Card>

        <Card title="Desenvolvimento">
          <p className="text-amber-800 leading-relaxed">
            O VESS foi desenvolvido a partir da metodologia de Peerlkamp (1959)
            e apresentado em sua primeira versão por Ball et al. (2007). Ajustes
            foram realizados por Guimarães et al. (2011), sendo esta a versão
            utilizada para este aplicativo.
          </p>
        </Card>

        <Card title="Aplicação">
          <p className="text-amber-800 leading-relaxed">
            O VESS é amplamente difundido no mundo, sendo testado para uma
            grande variedade de solos. Pode ser aplicado para qualquer solo, uso
            e manejo, fornecendo uma avaliação prática e acessível da qualidade
            estrutural do solo.
          </p>
        </Card>

        <Card title="Mais Informações">
          <div className="text-amber-800 space-y-2">
            <p>
              🌐{" "}
              <a
                href="https://www.sruc.ac.uk/vess"
                className="text-amber-600 underline"
              >
                Site oficial (Inglês)
              </a>
            </p>
            <p>
              🇧🇷{" "}
              <a
                href="http://paginapessoal.utfpr.edu.br/rachelguimaraes/vess"
                className="text-amber-600 underline"
              >
                Página em Português
              </a>
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
