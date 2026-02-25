'use client';

import { useState, useEffect } from 'react';
import { Hash, Timer, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChallengeLayout } from '@/components/challenge/challenge-layout';
import { getDailyQuestions } from '@/app/daily-actions';
import { Progress } from '@/components/ui/progress';

export default function NumberSeriesPage() {
    const router = useRouter();
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init() {
            const res = await getDailyQuestions('number-series');
            if (res.questions) {
                setQuestions(res.questions);
            }
            setLoading(false);
        }
        init();
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
        const currentQ = questions[currentIndex];
        if (option === currentQ.correctAnswer) {
            setScore(prev => prev + 10);
        }

        if (currentIndex + 1 >= questions.length) {
            // For daily challenges, we might just finish early or repeat until time is up
            setCurrentIndex(0); // Repeat for now or end
        } else {
            setCurrentIndex(prev => prev + 1);
        }
    };

    if (loading) {
        return (
            <ChallengeLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Hash className="w-16 h-16 text-primary animate-pulse mb-4" />
                    <h2 className="text-2xl font-headline tracking-widest uppercase italic animate-pulse">Fetching Daily Series...</h2>
                </div>
            </ChallengeLayout>
        );
    }

    const currentQ = questions[currentIndex];

    return (
        <ChallengeLayout>
            <div className="max-w-4xl mx-auto pt-4 space-y-6">
                <div className="flex justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-primary/10 shadow-sm">
                    <div className="flex items-center gap-3 text-primary">
                        <Timer className="w-6 h-6" />
                        <span className="text-3xl font-headline italic tracking-tighter">{timeLeft}s</span>
                    </div>
                    <div className="text-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Daily Rank Mode</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-2 text-primary">
                            <Trophy className="w-5 h-5" />
                            <span className="text-3xl font-headline italic tracking-tighter">{score}</span>
                        </div>
                    </div>
                </div>

                <Progress value={(timeLeft / 60) * 100} className="h-1.5" />

                <Card className="border-none shadow-2xl overflow-hidden rounded-3xl bg-white">
                    <CardHeader className="bg-slate-50 border-b border-primary/5 p-8">
                        <CardTitle className="text-4xl font-headline text-center tracking-widest text-slate-900">
                            {currentQ?.series}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        <p className="text-center text-muted-foreground font-bold uppercase tracking-widest text-xs">Complete the sequence</p>
                        <div className="grid grid-cols-2 gap-4">
                            {currentQ?.options?.map((option: string) => (
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
                </Card>
            </div>
        </ChallengeLayout>
    );
}

