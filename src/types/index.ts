export interface Layer {
  length: number;
  score: number;
}

export interface Sample {
  id: string;
  name: string;
  location: string;
  layers: Layer[];
  otherInfo: string;
  photos?: string[];
  managementDecision?: string;
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
  managementDescription: string;
}

export interface UserConfig {
  name: string;
  address: string;
  email: string;
  country: string;
  cityState: string;
  language: string;
}

export type EvaluationStep = 'setup' | 'layers' | 'result' | 'final';

export type Screen = 
  | 'menu' 
  | 'config' 
  | 'evaluate' 
  | 'history' 
  | 'about'
  | 'equipment'
  | 'where'
  | 'when'
  | 'extraction'
  | 'scores';