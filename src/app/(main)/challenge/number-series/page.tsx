'use client';

import { useState, useEffect } from 'react';
import { Hash, Timer, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChallengeLayout } from '@/components/challenge/challenge-layout';
import { Progress } from '@/components/ui/progress';
import { generateQuestion, GeneratedQuestion } from '@/lib/ai-client';

export default function NumberSeriesPage() {
    const router = useRouter();
    const [currentQ, setCurrentQ] = useState<GeneratedQuestion | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(900);

    const loadNextQuestion = async () => {
        setLoading(true);
        setError(null);
        try {
            // Asking our new AI integration to create a Number Series question
            const result = await generateQuestion('Number Series', 'medium');
            setCurrentQ(result);
        } catch (err: any) {
            console.error("Failed to load question:", err);
            setError(err.message || "AI failed to respond.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNextQuestion(); // Load the first question when the page loads
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            router.push(`/duel/number-series/results?score=${score}&daily=true`);
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, router, score]);

    const handleAnswer = (option: string) => {
        if (!currentQ) return;
        
        if (option === currentQ.correct_answer) {
            setScore(prev => prev + 10);
        }
        
        // Load the next question immediately after answering
        loadNextQuestion();
    };

    return (
        <ChallengeLayout>
            <div className="max-w-4xl mx-auto pt-4 space-y-6">
                <div className="flex justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-3 text-primary">
                        <Timer className="w-6 h-6" />
                        <span className="text-3xl font-headline italic tracking-tighter">{timeLeft}s</span>
                    </div>
                    <div className="text-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">AI Generated Mode</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-primary">
                            <Trophy className="w-5 h-5" />
                            <span className="text-3xl font-headline italic tracking-tighter">{score}</span>
                        </div>
                    </div>
                </div>

                <Progress value={(timeLeft / 900) * 100} className="h-1.5" />

                <Card className="border-none shadow-2xl overflow-hidden rounded-3xl bg-white min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-20 space-y-4">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-muted-foreground font-headline tracking-widest uppercase">The AI is thinking...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center p-20 space-y-4 text-center">
                            <p className="text-red-500 font-bold text-xl">⚠️ Error generating question</p>
                            <p className="text-slate-600 mb-4">{error}</p>
                            <Button onClick={loadNextQuestion} variant="outline">Try Again</Button>
                        </div>
                    ) : !currentQ ? (
                        <div className="flex flex-col items-center justify-center p-20">
                            <p className="text-red-500">Failed to load question data.</p>
                        </div>
                    ) : (
                        <>
                            <CardHeader className="bg-slate-50 border-b border-primary/5 p-8">
                                <CardTitle className="text-4xl font-headline text-center tracking-widest text-slate-900">
                                    {currentQ.question_text}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-8">
                                <p className="text-center text-muted-foreground font-bold uppercase tracking-widest text-xs">Complete the sequence</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {currentQ.options.map((option: string) => (
                                        <Button
                                            key={option}
                                            variant="outline"
                                            onClick={() => handleAnswer(option)}
                                            className="py-12 rounded-2xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 text-3xl font-headline transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-slate-700 hover:text-primary h-auto"
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </>
                    )}
                </Card>
            </div>
        </ChallengeLayout>
    );
}
