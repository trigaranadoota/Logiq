import { createClient } from './supabase';

export type GenerationDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface GeneratedQuestion {
  question_text: string;
  options: string[];
  correct_answer: string;
  explanation: string;
}

/**
 * Invokes the 'generate-question' Supabase Edge Function to get an AI-generated question.
 * Requires the user to be authenticated in the browser session.
 */
export async function generateQuestion(topic: string, difficulty: GenerationDifficulty = 'medium'): Promise<GeneratedQuestion> {
  const supabase = createClient();
  
  const { data, error } = await supabase.functions.invoke('generate-question', {
    body: { topic, difficulty },
  });

  if (error) {
    console.error('Error invoking generate-question function:', error);
    throw new Error(error.message || 'Failed to generate question');
  }

  return data as GeneratedQuestion;
}
