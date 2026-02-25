'use client';

import { useState, useEffect } from 'react';
import { BrainCircuit, Timer, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChallengeLayout } from '@/components/challenge/challenge-layout';
import { Progress } from '@/components/ui/progress';

const MOCK_QUESTIONS = [
  {
    question: "If all Zorgs are Bleeps and some Bleeps are Glips, which must be true?",
    clues: [
      "All Zorgs belong to the Bleep category.",
      "At least one Bleep is also a Glip.",
      "No other information about Glips is provided."
    ],
    options: ["All Zorgs are Glips", "Some Zorgs are Glips", "Some Bleeps are Zorgs", "No Zorgs are Glips"],
    correctAnswer: "Some Bleeps are Zorgs"
  },
  {
    question: "Which number comes next in the sequence: 2, 4, 8, 16, ...?",
    clues: [
      "Each number is double the previous one.",
      "The pattern is geometric.",
      "The next term is 16 * 2."
    ],
    options: ["20", "24", "32", "64"],
    correctAnswer: "32"
  }
];

export default function LogicPuzzlePage() {
  const router = useRouter();
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      router.push(`/duel/logic-puzzle/results?score=${score}`);
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
      router.push(`/duel/logic-puzzle/results?score=${score + (option === currentQ.correctAnswer ? 10 : 0)}`);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentQ = questions[currentIndex];

  return (
    <ChallengeLayout>
      <div className="max-w-4xl mx-auto pt-4 space-y-6">
        <div className="flex justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-primary/10 shadow-sm">
          <div className="flex items-center gap-3 text-primary">
            <Timer className="w-6 h-6" />
            <span className="text-3xl font-headline italic tracking-tighter">{timeLeft}s</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mr-1">Score</span>
            <div className="flex items-center gap-2 text-primary">
              <Trophy className="w-5 h-5" />
              <span className="text-3xl font-headline italic tracking-tighter">{score}</span>
            </div>
          </div>
        </div>

        <Progress value={(timeLeft / 180) * 100} className="h-1.5" />

        <Card className="border-none shadow-2xl overflow-hidden rounded-3xl bg-white">
          <CardHeader className="bg-slate-50 border-b border-primary/5 p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Question {currentIndex + 1}</div>
            <CardTitle className="text-3xl font-headline leading-tight text-slate-900">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8 text-slate-700">
            {currentQ.clues && (
              <div className="space-y-3 bg-slate-50/50 p-6 rounded-2xl border border-primary/5">
                {currentQ.clues.map((clue: string, i: number) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-lg leading-relaxed">{clue}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {currentQ.options.map((option: string) => (
                <Button
                  key={option}
                  variant="outline"
                  onClick={() => handleAnswer(option)}
                  className="py-10 rounded-2xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 text-xl font-headline tracking-wide transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-slate-700 hover:text-primary h-auto flex flex-col items-start px-8"
                >
                  <span className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Select Answer</span>
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


