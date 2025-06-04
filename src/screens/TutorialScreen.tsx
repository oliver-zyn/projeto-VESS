import React from "react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Card } from "../components/ui/Card";
import { TUTORIAL_CONTENT } from "../utils/constants";

interface TutorialScreenProps {
  onBack: () => void;
  type: "equipment" | "where" | "when" | "extraction";
}

export const TutorialScreen: React.FC<TutorialScreenProps> = ({
  onBack,
  type,
}) => {
  const content = TUTORIAL_CONTENT[type];

  return (
    <Layout>
      <Header title={content.title} onBack={onBack} />

      <div className="bg-amber-100 p-6">
        <Card>
          <div className="text-amber-800 leading-relaxed">
            {content.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>

        <Card className="mt-4">
          <div className="text-center py-8 text-amber-600">
            <p>Imagem ilustrativa</p>
            <p className="text-sm mt-2">
              (Adicione as imagens na pasta public/images/tutorials/)
            </p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
