import React, { useState } from "react";
import { Eye, EyeOff, Leaf, ChevronLeft } from "lucide-react";
import { Layout } from "../components/ui/Layout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { useAuth } from "../contexts/AuthContext";

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onNavigateToLogin,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    country: "Brasil",
    cityState: "",
    language: "Português (Brasil)",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      return "Por favor, preencha todos os campos obrigatórios";
    }

    if (formData.password.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      return "As senhas não coincidem";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Por favor, insira um email válido";
    }

    return null;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");

      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address || undefined,
        country: formData.country,
        cityState: formData.cityState || undefined,
        language: formData.language,
      });

      // O redirecionamento será feito automaticamente pelo AuthContext
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center">
            <button
              onClick={onNavigateToLogin}
              className="flex items-center text-amber-700 hover:text-amber-900 mb-4"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Voltar ao login
            </button>

            <div className="flex justify-center mb-4">
              <div className="bg-amber-700 p-3 rounded-full">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-amber-900">VESS</h1>
            <p className="text-amber-700 mt-2">Criar nova conta</p>
          </div>

          {/* Form */}
          <Card>
            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <Input
                label="Nome completo"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Seu nome completo"
                required
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="seu@email.com"
                required
              />

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">
                  Senha <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                    className="w-full p-3 pr-12 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-1">
                  Confirmar senha <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      updateField("confirmPassword", e.target.value)
                    }
                    placeholder="Digite a senha novamente"
                    required
                    className="w-full p-3 pr-12 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Input
                label="Endereço"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Seu endereço (opcional)"
              />

              <div className="grid grid-cols-2 gap-3">
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
                  </select>
                </div>

                <Input
                  label="Cidade - Estado"
                  value={formData.cityState}
                  onChange={(e) => updateField("cityState", e.target.value)}
                  placeholder="Cidade - UF"
                />
              </div>

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

              <Button fullWidth disabled={loading} className="mt-6">
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>
          </Card>

          {/* Login Link */}
          <Card>
            <div className="text-center">
              <p className="text-amber-800">
                Já tem uma conta?{" "}
                <button
                  onClick={onNavigateToLogin}
                  className="text-amber-600 hover:text-amber-800 font-medium underline"
                >
                  Fazer login
                </button>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
