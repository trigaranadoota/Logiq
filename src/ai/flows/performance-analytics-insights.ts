'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating performance analytics insights after a match.
 *
 * The flow takes in match statistics, including the user's score, ELO rating change, speed comparison data,
 * and answer times, and uses AI to identify the most important insights for the user.
 *
 * @exported performanceAnalyticsInsights - An async function that processes match data and returns AI-generated insights.
 * @exported PerformanceAnalyticsInput - The TypeScript interface for the input schema.
 * @exported PerformanceAnalyticsOutput - The TypeScript interface for the output schema.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the input schema for the performance analytics flow
const PerformanceAnalyticsInputSchema = z.object({
  userScore: z.number().describe('The user\'s score in the match.'),
  opponentScore: z.number().describe('The opponent\'s score in the match.'),
  eloRatingChange: z.number().describe('The change in the user\'s ELO rating after the match.'),
  yourSpeedData: z.array(z.number()).describe('An array of numbers representing the user\'s speed over time.'),
  opponentSpeedData: z.array(z.number()).describe('An array of numbers representing the opponent\'s speed over time.'),
  averageTime: z.number().describe('The user\'s average time to answer questions.'),
  fastestAnswer: z.number().describe('The user\'s fastest time to answer a question.'),
  slowestAnswer: z.number().describe('The user\'s slowest time to answer a question.'),
  opponentAverageTime: z.number().describe('The opponent\'s average time to answer questions.'),
  opponentFastestAnswer: z.number().describe('The opponent\'s fastest time to answer a question.'),
  opponentSlowestAnswer: z.number().describe('The opponent\'s slowest time to answer a question.'),
});
export type PerformanceAnalyticsInput = z.infer<typeof PerformanceAnalyticsInputSchema>;

// Define the output schema for the performance analytics flow
const PerformanceAnalyticsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights based on the match performance data.'),
});
export type PerformanceAnalyticsOutput = z.infer<typeof PerformanceAnalyticsOutputSchema>;

// Define the Genkit flow
const performanceAnalyticsFlow = ai.defineFlow(
  {
    name: 'performanceAnalyticsFlow',
    inputSchema: PerformanceAnalyticsInputSchema,
    outputSchema: PerformanceAnalyticsOutputSchema,
  },
  async input => {
    const { output } = await summarizePerformancePrompt(input);
    return output!;
  }
);

// Define the prompt for summarizing performance analytics
const summarizePerformancePrompt = ai.definePrompt({
  name: 'summarizePerformancePrompt',
  input: { schema: PerformanceAnalyticsInputSchema },
  output: { schema: PerformanceAnalyticsOutputSchema },
  prompt: `You are an AI that analyzes match performance data and provides the most important insights to the user.

  Here's the match data:
  - User Score: {{{userScore}}}
  - Opponent Score: {{{opponentScore}}}
  - ELO Rating Change: {{{eloRatingChange}}}
  - Your Speed Data: {{{yourSpeedData}}}
  - Opponent Speed Data: {{{opponentSpeedData}}}
  - Average Time: {{{averageTime}}}
  - Fastest Answer: {{{fastestAnswer}}}
  - Slowest Answer: {{{slowestAnswer}}}
  - Opponent Average Time: {{{opponentAverageTime}}}
  - Opponent Fastest Answer: {{{opponentFastestAnswer}}}
  - Opponent Slowest Answer: {{{opponentSlowestAnswer}}}

  Provide a concise summary of the most important insights from this data, highlighting strengths and weaknesses. Focus on information most actionable for the user to improve. Limit to 2 sentences.
  `,
});

/**
 * Analyzes match data and returns AI-generated insights.
 * @param input - The input data for performance analytics.
 * @returns A promise that resolves to the AI-generated insights.
 */
export async function performanceAnalyticsInsights(input: PerformanceAnalyticsInput): Promise<PerformanceAnalyticsOutput> {
  const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MISSING_API_KEY') {
    return {
      insights: "Great match! Keep focusing on your speed and accuracy to continue climbing the ranks.",
    };
  }

  try {
    return await performanceAnalyticsFlow(input);
  } catch (error) {
    console.error('AI Insights Error:', error);
    return {
      insights: "Excellent performance in this duel. Review your speed data to find more opportunities for improvement.",
    };
  }
}
