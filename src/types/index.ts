export interface Layer {
  length: number;
  score: number;
  order?: number;
}

export interface Sample {
  id?: string;
  name: string;
  location?: string;
  layers: Layer[];
  otherInfo?: string;
  photos?: string[];
  managementDecision?: string;
  sampleScore?: number;
}

export interface Evaluation {
  id: string;
  name: string;
  evaluator: string;
  date: string;
  startTime: string;
  endTime?: string;
  samples: Sample[];
  averageScore: number;
  managementDescription?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface UserConfig {
  name: string;
  address?: string;
  email: string;
  country: string;
  cityState?: string;
  language: string;
}

export interface User extends UserConfig {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
  address?: string;
  country?: string;
  cityState?: string;
  language?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  type: "access" | "refresh";
  iat?: number;
  exp?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface LayerData {
  length: number;
  score: number;
  order: number;
}

export interface SampleData {
  name: string;
  location?: string;
  otherInfo?: string;
  managementDecision?: string;
  layers: LayerData[];
}

export interface EvaluationData {
  name: string;
  date: string;
  startTime: string;
  endTime?: string;
  managementDescription?: string;
  samples: SampleData[];
}

export type CreateUserData = RegisterData;

export interface UpdateUserData {
  name?: string;
  address?: string;
  country?: string;
  cityState?: string;
  language?: string;
}

export interface EvaluationStats {
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
}

export interface UserStats {
  totalEvaluations: number;
  totalSamples: number;
  memberSince: string;
  lastEvaluation?: {
    id: string;
    name: string;
    date: string;
    averageScore: number;
  };
  evaluationsThisMonth: number;
}

export type EvaluationStep = "setup" | "layers" | "result" | "final";

// TIPOS ATUALIZADOS COM NOVAS TELAS
export type Screen =
  | "menu"
  | "config"
  | "evaluate"
  | "history"
  | "about"
  | "equipment"
  | "where"
  | "when"
  | "extraction"
  | "exposition" // NOVO
  | "scores" // NOVO
  | "management" // NOVO
  | "complementary"; // NOVO

export type AuthScreen = "login" | "register";
export type AppScreen = Screen | AuthScreen;

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<UserConfig>) => Promise<void>;
  isAuthenticated: boolean;
}

export interface UseEvaluationsReturn {
  evaluations: Evaluation[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo | null;
  createEvaluation: (data: EvaluationData) => Promise<Evaluation>;
  updateEvaluation: (
    id: string,
    data: Partial<EvaluationData>
  ) => Promise<Evaluation>;
  deleteEvaluation: (id: string) => Promise<void>;
  getEvaluationById: (id: string) => Promise<Evaluation>;
  refreshEvaluations: () => Promise<void>;
  loadPage: (page: number) => Promise<void>;
}

export interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "warning";
  size?: "sm" | "md" | "lg";
  icon?: React.ComponentType<{ className?: string }>;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface InputProps {
  label?: string;
  type?: "text" | "email" | "number" | "password";
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  variant?: "default" | "clickable";
  className?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  success: false;
  error: string;
  details?: ValidationError[];
}

export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export const VESS_SCORES = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5] as const;
export type VessScore = (typeof VESS_SCORES)[number];

export const LANGUAGES = ["Português (Brasil)", "English", "Español"] as const;
export type Language = (typeof LANGUAGES)[number];

export const COUNTRIES = [
  "Brasil",
  "Argentina",
  "Paraguai",
  "Uruguai",
] as const;
export type Country = (typeof COUNTRIES)[number];

export interface TutorialContent {
  title: string;
  content: string;
  images?: string[];
}

// TIPOS ATUALIZADOS PARA INCLUIR NOVAS TELAS
export type TutorialType =
  | "equipment"
  | "where"
  | "when"
  | "extraction"
  | "exposition"
  | "scores"
  | "management"
  | "complementary";

export interface ScoreDescription {
  title: string;
  description: string;
  characteristic: string;
  images?: {
    clayey?: string;
    sandy?: string;
  };
}

export interface AppConfig {
  apiBaseUrl: string;
  version: string;
  environment: "development" | "production" | "test";
}

export interface StorageKeys {
  ACCESS_TOKEN: "accessToken";
  REFRESH_TOKEN: "refreshToken";
  USER_CONFIG: "vess-user-config";
  EVALUATIONS: "vess-evaluations";
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type FormData<T> = {
  [K in keyof T]: T[K] extends string | number ? T[K] : string;
};
export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export type {
  FC,
  ReactNode,
  ComponentType,
  ChangeEvent,
  FormEvent,
  MouseEvent,
  KeyboardEvent,
} from "react";
