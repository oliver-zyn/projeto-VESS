import type { UserConfig } from "../types";

export const VESS_SCORES = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] as const;

export const SCORE_DESCRIPTIONS = {
  1: {
    title: "Qualidade estrutural (Qe) 1 Friável",
    description: "Agregados quebram facilmente com os dedos. Tamanho e aparência dos agregados: Maioria < 6 mm após a quebra. Alta porosidade e raízes por todo solo.",
    characteristic: "Agregados pequenos"
  },
  2: {
    title: "Qualidade estrutural (Qe) 2 Intacto", 
    description: "Agregados quebram facilmente com uma mão. Uma mistura de agregados porosos e redondos entre 2 mm – 7 cm. Maioria dos agregados são porosos e raízes por todo solo.",
    characteristic: "Agregados altamente porosos"
  },
  3: {
    title: "Qualidade estrutural (Qe) 3 Firme",
    description: "Maioria dos agregados quebram com uma mão. Uma mistura de agregados porosos entre 2mm -10 cm; menos de 30% são <1 cm. Macroporos e fissuras presentes.",
    characteristic: "Agregados com baixa porosidade"
  },
  4: {
    title: "Qualidade estrutural (Qe) 4 Compacto",
    description: "Quebrar agregados com uma mão requer esforço considerável. Maioria > 10 cm e são sub-angulares não porosos. Poucos macroporos e fissuras.",
    characteristic: "Macroporos bem distintos"
  },
  5: {
    title: "Qualidade estrutural (Qe) 5 Muito compacto",
    description: "Difícil quebra. Maioria são maiores que > 10 cm, muito poucos < 7 cm, angular e não poroso. Porosidade muito baixa.",
    characteristic: "Cor azul acinzentada"
  }
};

export const MANAGEMENT_DECISIONS = {
  good: "Amostras com escores Qe-VESS de 1-2,9 indicam um solo com boa qualidade estrutural e não requerem mudanças no manejo.",
  reasonable: "Amostras com escores Qe-VESS de 3-3,9 indicam um solo com qualidade estrutural razoável que pode ser melhorado. Para maximizar a exploração do solo pelas raízes das culturas, as mudanças no manejo devem ser a longo prazo.",
  poor: "Amostras com escores Qe-VESS de 4-5 sugerem danos às funções do solo, comprometendo sua capacidade de suporte ao crescimento das culturas. Mudança de manejo deve ser a curto prazo."
};

export const TUTORIAL_CONTENT = {
  equipment: {
    title: "Equipamentos",
    content: "Pá reta de aproximadamente 25 cm de largura e 22-25 cm de comprimento, trena ou régua de 30 cm. Opcional: folha plástica de cor clara ou bandeja 50 x 80 cm."
  },
  where: {
    title: "Onde amostrar", 
    content: "O VESS pode ser aplicado para qualquer solo, uso e manejo. É importante selecionar a área de interesse e sempre comparar com uma área com boa qualidade estrutural (mata nativa ou solo não cultivado). Dentro de uma área homogênea avalie 3 a 5 pontos."
  },
  when: {
    title: "Quando amostrar",
    content: "O VESS pode ser realizado em qualquer época do ano. Em solos argilosos deve-se esperar pelo menos 4 dias após uma chuva (> 50 mm) ou períodos chuvosos. Se o solo estiver muito seco ou muito úmido será difícil obter uma amostra representativa."
  },
  extraction: {
    title: "Extração da amostra",
    content: "Abra uma pequena trincheira cavando somente em lados opostos, reservando os outros dois lados para a retirada da amostra de solo. Retire uma amostra de 10 a 15 cm de espessura, 20 cm de largura e aprox. 25 cm de profundidade."
  }
};

export const DEFAULT_USER_CONFIG: UserConfig = {
  name: '',
  address: '',
  email: '',
  country: 'Brasil',
  cityState: '',
  language: 'Português (Brasil)'
};