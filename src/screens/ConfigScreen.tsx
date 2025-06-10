import React, { useState, useEffect } from "react";
import { LogOut, Save, RefreshCw } from "lucide-react";
import { Layout } from "../components/ui/Layout";
import { Header } from "../components/ui/Header";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import type { UserConfig } from "../types";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../services/api";
interface ConfigScreenProps {
  onBack: () => void;
  config: UserConfig & { id: string };
  setConfig: (config: Partial<UserConfig>) => Promise<void>;
}
export const ConfigScreen: React.FC<ConfigScreenProps> = ({
  onBack,
  config,
  setConfig,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    country: "Brasil",
    cityState: "",
    language: "Português (Brasil)",
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { logout } = useAuth();
  const loadUserProfile = async () => {
    try {
      setRefreshing(true);
      setError("");
      const userProfile = await apiService.getUserProfile();
      console.log("Perfil carregado da API:", userProfile); 
      setFormData({
        name: userProfile.name || "",
        email: userProfile.email || "",
        address: userProfile.address || "",
        country: userProfile.country || "Brasil",
        cityState: userProfile.cityState || "",
        language: userProfile.language || "Português (Brasil)",
      });
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      setError("Erro ao carregar dados do perfil");
      setFormData({
        name: config.name || "",
        email: config.email || "",
        address: config.address || "",
        country: config.country || "Brasil",
        cityState: config.cityState || "",
        language: config.language || "Português (Brasil)",
      });
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    loadUserProfile();
  }, []);
  useEffect(() => {
    if (config && !refreshing) {
      setFormData((prev) => ({
        name: config.name || prev.name,
        email: config.email || prev.email,
        address: config.address || prev.address,
        country: config.country || prev.country,
        cityState: config.cityState || prev.cityState,
        language: config.language || prev.language,
      }));
    }
  }, [config]);
  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);
      console.log("Salvando dados:", formData); 
      await setConfig({
        name: formData.name,
        address: formData.address || undefined, 
        country: formData.country,
        cityState: formData.cityState || undefined, 
        language: formData.language,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Erro ao salvar:", err);
      setError(
        err instanceof Error ? err.message : "Erro ao salvar configurações"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
      logout();
    }
  };
  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <Layout>
      <Header title="Configurações" onBack={onBack} />
      <div className="bg-amber-100 p-6 space-y-4">
        {success && (
          <Card className="bg-green-100 border-green-300">
            <p className="text-green-800 text-center font-medium">
              ✅ Configurações salvas com sucesso!
            </p>
          </Card>
        )}
        {error && (
          <Card className="bg-red-100 border-red-300">
            <p className="text-red-800 text-center">{error}</p>
          </Card>
        )}
        <Card>
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-amber-900">Conta Conectada</h3>
            <p className="text-amber-700">{formData.email}</p>
            <p className="text-sm text-amber-600">ID: {config.id}</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={loadUserProfile}
              disabled={refreshing}
              icon={RefreshCw}
              className={refreshing ? "animate-spin" : ""}
            >
              {refreshing ? "Atualizando..." : "Atualizar dados"}
            </Button>
          </div>
        </Card>
        <Card>
          <div className="space-y-4">
            <Input
              label="Nome:"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
            />
            <Input
              label="Endereço:"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Seu endereço completo (opcional)"
            />
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                Email:
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full p-3 border border-amber-300 rounded-lg bg-amber-50 text-amber-600 cursor-not-allowed"
              />
              <p className="text-xs text-amber-600 mt-1">
                O email não pode ser alterado
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-amber-900 mb-1">
                País:
              </label>
              <select
                value={formData.country}
                onChange={(e) => updateField("country", e.target.value)}
                className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
              >
                <option value="Brasil">Brasil</option>
                <option value="Argentina">Argentina</option>
                <option value="Paraguai">Paraguai</option>
                <option value="Uruguai">Uruguai</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <Input
              label="Cidade - Estado:"
              value={formData.cityState}
              onChange={(e) => updateField("cityState", e.target.value)}
              placeholder="Ex: Pato Branco - PR"
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
          </div>
        </Card>
        <div className="space-y-3">
          <Button
            onClick={handleSave}
            fullWidth
            disabled={loading || refreshing}
            icon={Save}
          >
            {loading ? "Salvando..." : "Salvar Configurações"}
          </Button>
          <Button
            onClick={handleLogout}
            variant="danger"
            fullWidth
            icon={LogOut}
          >
            Sair da Conta
          </Button>
        </div>
        <Card>
          <div className="text-center space-y-2">
            <button className="text-amber-700 hover:text-amber-900 underline text-sm">
              Termos e condições de uso
            </button>
            <p className="text-xs text-amber-600">Versão 3.0 | UTFPR</p>
          </div>
        </Card>
      </div>
    </Layout>
  );
};
