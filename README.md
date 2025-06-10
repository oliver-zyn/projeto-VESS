# VESS - Avaliação Visual da Estrutura do Solo

Aplicativo para avaliação da qualidade estrutural do solo através do método VESS (Visual Evaluation of Soil Structure).

## 🚀 Tecnologias

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Lucide React** (ícones)

## 📦 Instalação

1. **Clone ou baixe o projeto** (se necessário)

2. **Instale as dependências:**

```bash
npm install
```

## 🏃‍♂️ Executar o projeto

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── ui/             # Componentes de interface
├── screens/            # Telas principais
├── hooks/              # Custom hooks
├── services/           # Lógica de negócio
├── types/              # Tipos TypeScript
├── utils/              # Utilitários e constantes
└── App.tsx             # Componente principal
```

## 🎯 Funcionalidades

### ✅ Implementado

- [x] Tela principal com navegação
- [x] Configurações de usuário
- [x] Fluxo completo de avaliação VESS
- [x] Cálculo automático de escores
- [x] Telas de tutorial
- [x] Histórico de avaliações
- [x] Persistência local de dados
- [x] Design responsivo mobile-first

### 🔄 Próximos passos

- [ ] Integração com GPS/geolocalização
- [ ] Captura de fotos
- [ ] Exportação de relatórios
- [ ] Tela de escores VESS com imagens
- [ ] Backend com Node.js + PostgreSQL
- [ ] Sincronização de dados

## 📱 Como usar

1. **Configure seus dados** na tela de Configurações
2. **Explore os tutoriais** para aprender sobre o método VESS
3. **Realize uma avaliação:**
   - Clique em "AVALIAR"
   - Configure a amostra (nome, localização, camadas)
   - Insira os dados de cada camada
   - Visualize o resultado e decisão de manejo
4. **Consulte o histórico** de avaliações realizadas

## 🎨 Personalização

As cores principais podem ser ajustadas no arquivo `tailwind.config.js`:

```javascript
colors: {
  amber: {
    // Personalize as cores aqui
  }
}
```

## 📄 Licença

Este projeto é desenvolvido para fins acadêmicos e de pesquisa em ciência do solo.
