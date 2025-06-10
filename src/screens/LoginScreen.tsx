import React, { useState } from "react";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { Layout } from "../components/ui/Layout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { useAuth } from "../contexts/AuthContext";
interface LoginScreenProps {
  onNavigateToRegister: () => void;
}
export const LoginScreen: React.FC<LoginScreenProps> = ({
  onNavigateToRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };
  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await login("demo@vess.com", "123456");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao fazer login com usuário demo"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-700 p-3 rounded-full">
                <Leaf className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-amber-900">VESS</h1>
            <p className="text-amber-700 mt-2">
              Avaliação Visual da Estrutura do Solo
            </p>
          </div>
          <Card>
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="text-xl font-semibold text-center text-amber-900 mb-6">
                Entrar na sua conta
              </h2>
              {error && (
                <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
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
              <Button fullWidth disabled={loading} className="mt-6">
                {loading ? "Entrando..." : "Entrar"}
              </Button>
              <Button
                variant="secondary"
                fullWidth
                onClick={handleDemoLogin}
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar como Demo"}
              </Button>
            </form>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-amber-800">
                Não tem uma conta?{" "}
                <button
                  onClick={onNavigateToRegister}
                  className="text-amber-600 hover:text-amber-800 font-medium underline"
                >
                  Criar conta
                </button>
              </p>
            </div>
          </Card>
          <div className="text-center text-sm text-amber-600">
            <p>Desenvolvido pela UTFPR</p>
            <p>Prof. Dr. Rachel Muylaert Locks Guimarães</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
