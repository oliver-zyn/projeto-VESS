import React, { useState } from "react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import type { UserConfig } from "../types";

interface ConfigScreenProps {
  onBack: () => void;
  config: UserConfig;
  setConfig: (config: UserConfig) => void;
}

export const ConfigScreen: React.FC<ConfigScreenProps> = ({
  onBack,
  config,
  setConfig,
}) => {
  const [formData, setFormData] = useState(config);

  const handleSave = () => {
    setConfig(formData);
    onBack();
  };

  const updateField = (field: keyof UserConfig, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      <Header title="Configurações" onBack={onBack} />

      <div className="bg-amber-100 p-6 space-y-4">
        <Input
          label="Nome:"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
        />

        <Input
          label="Endereço:"
          value={formData.address}
          onChange={(e) => updateField("address", e.target.value)}
        />

        <Input
          label="E-mail:"
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
        />

        <Input
          label="País:"
          value={formData.country}
          onChange={(e) => updateField("country", e.target.value)}
        />

        <Input
          label="Cidade - Estado:"
          value={formData.cityState}
          onChange={(e) => updateField("cityState", e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-amber-900 mb-1">
            Idioma:
          </label>
          <select
            value={formData.language}
            onChange={(e) => updateField("language", e.target.value)}
            className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
          >
            <option value="Português (Brasil)">Português (Brasil)</option>
            <option value="English">English</option>
            <option value="Español">Español</option>
          </select>
        </div>

        <Button onClick={handleSave} fullWidth className="mt-6">
          Salvar
        </Button>

        <button
          onClick={() => onBack()}
          className="w-full text-center text-amber-700 mt-4 hover:text-amber-800 underline"
        >
          Termos e condições de uso
        </button>
      </div>
    </Layout>
  );
};
