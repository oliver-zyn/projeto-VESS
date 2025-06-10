import type { UserConfig, Evaluation, EvaluationData } from "../types";
const API_BASE_URL = "http://localhost:3000";
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
interface LoginResponse {
  user: UserConfig & { id: string };
  accessToken: string;
  refreshToken: string;
}
class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }
  private async handleResponse<T>(response: Response): Promise<T> {
    const data: ApiResponse<T> = await response.json();
    if (!response.ok) {
      if (response.status === 401 && data.error?.includes("expirado")) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          throw new Error("TOKEN_REFRESHED"); 
        }
      }
      throw new Error(data.error || "Erro na requisição");
    }
    return data.data!;
  }
  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return false;
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (response.ok) {
        const data: ApiResponse<LoginResponse> = await response.json();
        localStorage.setItem("accessToken", data.data!.accessToken);
        localStorage.setItem("refreshToken", data.data!.refreshToken);
        return true;
      }
      this.logout();
      return false;
    } catch {
      this.logout();
      return false;
    }
  }
  async register(userData: {
    email: string;
    name: string;
    password: string;
    address?: string;
    country?: string;
    cityState?: string;
    language?: string;
  }): Promise<LoginResponse> {
    console.log("Registrando usuário:", userData); 
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const result = await this.handleResponse<LoginResponse>(response);
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    console.log("Usuário registrado:", result.user); 
    return result;
  }
  async login(email: string, password: string): Promise<LoginResponse> {
    console.log("Fazendo login:", email); 
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await this.handleResponse<LoginResponse>(response);
    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    console.log("Login realizado:", result.user); 
    return result;
  }
  logout(): void {
    console.log("Fazendo logout"); 
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("vess-user-config");
  }
  async verifyToken(): Promise<{ user: UserConfig & { id: string } } | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: "POST",
        headers: this.getAuthHeaders(),
      });
      if (response.ok) {
        const result = await this.handleResponse<{
          user: UserConfig & { id: string };
        }>(response);
        console.log("Token verificado:", result); 
        return result;
      }
      return null;
    } catch (error) {
      console.log("Erro ao verificar token:", error); 
      return null;
    }
  }
  async getUserProfile(): Promise<UserConfig & { id: string }> {
    console.log("Buscando perfil do usuário..."); 
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: this.getAuthHeaders(),
    });
    const result = await this.handleResponse<UserConfig & { id: string }>(
      response
    );
    console.log("Perfil retornado:", result); 
    return result;
  }
  async updateUserProfile(
    userData: Partial<UserConfig>
  ): Promise<UserConfig & { id: string }> {
    console.log("Atualizando perfil:", userData); 
    const cleanData = Object.fromEntries(
      Object.entries(userData).filter(
        ([, value]) => value !== undefined && value !== ""
      )
    );
    console.log("Dados limpos para envio:", cleanData); 
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(cleanData),
    });
    const result = await this.handleResponse<UserConfig & { id: string }>(
      response
    );
    console.log("Perfil atualizado:", result); 
    return result;
  }
  async getEvaluations(
    page = 1,
    limit = 10
  ): Promise<{
    evaluations: Evaluation[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }> {
    console.log(
      `🔄 Fazendo request para: ${API_BASE_URL}/evaluations?page=${page}&limit=${limit}`
    ); 
    try {
      const response = await fetch(
        `${API_BASE_URL}/evaluations?page=${page}&limit=${limit}`,
        { headers: this.getAuthHeaders() }
      );
      console.log("📡 Response status:", response.status); 
      console.log(
        "📡 Response headers:",
        Object.fromEntries(response.headers.entries())
      ); 
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Response error:", errorText); 
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }
      const fullResponse = await response.json();
      console.log("📦 Response completa:", fullResponse); 
      if (!fullResponse.success) {
        throw new Error(fullResponse.error || "Resposta inválida da API");
      }
      let evaluations: Evaluation[] = [];
      let pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      } = {
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
        hasNextPage: false,
        hasPreviousPage: false
      };
      if (Array.isArray(fullResponse.data)) {
        evaluations = fullResponse.data;
        pagination = fullResponse.pagination || {};
      } else if (fullResponse.data && typeof fullResponse.data === "object") {
        evaluations = fullResponse.data.evaluations || fullResponse.data;
        pagination =
          fullResponse.data.pagination || fullResponse.pagination || {};
      }
      console.log("📋 Avaliações extraídas:", evaluations); 
      console.log("📄 Paginação extraída:", pagination); 
      if (!Array.isArray(evaluations)) {
        console.warn("⚠️ Evaluations não é um array:", evaluations);
        evaluations = [];
      }
      const mappedEvaluations = evaluations.map((evaluation: Evaluation) => ({
        id: evaluation.id,
        name: evaluation.name || "Avaliação sem nome",
        evaluator:
          evaluation.user?.name ||
          evaluation.evaluator ||
          "Avaliador desconhecido",
        date: evaluation.date || "Data não informada",
        startTime: evaluation.startTime || "00:00",
        endTime: evaluation.endTime,
        samples: evaluation.samples || [],
        averageScore: evaluation.averageScore || 0,
        managementDescription: evaluation.managementDescription,
        createdAt: evaluation.createdAt,
        updatedAt: evaluation.updatedAt,
        user: evaluation.user,
      }));
      console.log("✅ Avaliações mapeadas:", mappedEvaluations); 
      return {
        evaluations: mappedEvaluations,
        pagination: pagination || {
          currentPage: page,
          totalPages: 1,
          totalItems: mappedEvaluations.length,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    } catch (error) {
      console.error("❌ Erro em getEvaluations:", error); 
      throw error;
    }
  }
  async createEvaluation(evaluationData: EvaluationData): Promise<Evaluation> {
    console.log("Criando avaliação:", evaluationData); 
    const response = await fetch(`${API_BASE_URL}/evaluations`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(evaluationData),
    });
    const result = await this.handleResponse<Evaluation>(response);
    console.log("Avaliação criada:", result); 
    return result;
  }
  async getEvaluationById(id: string): Promise<Evaluation> {
    const response = await fetch(`${API_BASE_URL}/evaluations/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Evaluation>(response);
  }
  async updateEvaluation(
    id: string,
    updateData: Partial<EvaluationData>
  ): Promise<Evaluation> {
    const response = await fetch(`${API_BASE_URL}/evaluations/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updateData),
    });
    return this.handleResponse<Evaluation>(response);
  }
  async deleteEvaluation(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/evaluations/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });
    await this.handleResponse(response);
  }
  async getEvaluationStats(): Promise<{
    totalEvaluations: number;
    totalSamples: number;
    averageScore: number;
    scoreDistribution: {
      excellent: number;
      reasonable: number;
      poor: number;
    };
    recentActivity: {
      lastEvaluation?: string;
      evaluationsThisMonth: number;
    };
  }> {
    const response = await fetch(`${API_BASE_URL}/evaluations/stats`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }
  async healthCheck(): Promise<{ message: string; version: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return this.handleResponse(response);
  }
}
export const apiService = new ApiService();
export default apiService;
