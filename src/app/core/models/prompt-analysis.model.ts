export interface PromptAnalysisObject {
    score?: number;
    issues?: string[];
    suggestions?: string[];
    metadata?: PromptAnalysisMeta ;
    tokenCount?: number;
    suggestedPrompt?: string;
}

export interface PromptAnalysisRequest {
    provider: string;
    model: string;
    promptText: string;
    analysisStep: string;
}

export interface PromptAnalysisResponse {
    promptAnalysis?: PromptAnalysisObject;
    updatedPrompt?: string;
    nextStep?: string;
    stepName?: string;
    status?: string;
}

export interface PromptAnalysisApiResponse {
    promptAnalysis?: PromptAnalysisObject;
    updatedPrompt?: string;
    nextPrompt?: string;
    nextStep?: string;
}

export interface PromptAnalysisMeta {
    clarity: number;
    completeness: number;
    structure: number;
    context: number;
    risk: number;
}

export interface PromptAnalysisStreamEvent {
    stepName?: string;
    status?: string;
    promptAnalysis?: PromptAnalysisObject;
    updatedPrompt?: string;
    nextStep?: string;
}
