"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveMatchResult } from "@/app/game-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpeedChart } from "@/components/analytics/speed-chart";
import { StatsTable } from "@/components/analytics/stats-table";
import AiInsights from "@/components/analytics/ai-insights";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { MatchmakingOverlay } from "@/components/dashboard/matchmaking-overlay";
import { Trophy, CheckCircle2, ArrowRight } from "lucide-react";

export default function ResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score') || '0');
  const isDaily = searchParams.get('daily') === 'true';
  const matchId = searchParams.get('matchId');

  const [isMatchmaking, setIsMatchmaking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function persistResult() {
      if (isSaved) return;

      // For Daily Challenges, we just save the user's performance
      // For Duels, we check against opponent (this part would ideally fetch match data from DB)
      // For now, let's assume a win if score > 50 for Duels, or just mark as self-win
      const won = score > 0;

      await saveMatchResult({
        gameType: params.id,
        winnerId: isDaily ? 'self' : 'self', // Daily is always self-recorded
        score: { user: score, total: score },
        xpGained: isDaily ? (score / 2) : 25,
        streakIncrement: score > 30
      });
      setIsSaved(true);
    }
    persistResult();
  }, [params.id, isSaved, score, isDaily]);

  const gameTitle = params.id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Mocked analytics data based on real score
  const yourSpeedData = Array.from({ length: 60 }, (_, i) => Math.floor(Math.random() * 20 + 80 + (score / 10)));
  const opponentSpeedData = Array.from({ length: 60 }, (_, i) => Math.floor(Math.random() * 15 + 85));

  const stats = {
    avgTime: (60 / Math.max(1, score / 10)).toFixed(1),
    fastest: "0.8s",
    slowest: "4.2s"
  };

  const analyticsInput = {
    userScore: score,
    opponentScore: isDaily ? null : 17,
    eloRatingChange: isDaily ? 10 : 25,
    yourSpeedData: yourSpeedData,
    opponentSpeedData: isDaily ? [] : opponentSpeedData,
    averageTime: stats.avgTime,
    fastestAnswer: "0.8s",
    slowestAnswer: "4.2s",
  };

  const handlePlayAgain = () => {
    if (!isDaily) {
      setIsMatchmaking(true);
      setTimeout(() => {
        router.push(`/arena?play=${params.id}`);
      }, 1500);
    } else {
      router.push(`/challenge/${params.id}`);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <MatchmakingOverlay
        gameId={params.id}
        gameTitle={gameTitle}
        isVisible={isMatchmaking}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">

        {/* Header: Result Summary */}
        <Card className="text-center p-8 bg-white shadow-xl rounded-3xl border-none overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>

          {isDaily ? (
            <div className="space-y-4 pt-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <CardTitle className="font-headline text-5xl text-slate-900">CHALLENGE COMPLETE</CardTitle>
              <p className="text-muted-foreground uppercase tracking-widest font-bold text-sm">Global 24-Hour Rotation Set</p>

              <div className="flex justify-center items-baseline gap-2 pt-4">
                <span className="text-7xl font-headline italic tracking-tighter text-primary">{score}</span>
                <span className="text-xl font-headline text-slate-400">PTS</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pt-4">
              <Trophy className="w-16 h-16 text-primary mx-auto animate-bounce" />
              <CardTitle className="font-headline text-6xl text-primary">VICTORY</CardTitle>

              <div className="flex justify-center items-center gap-12 pt-4">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-20 h-20 border-4 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary">YOU</AvatarFallback>
                  </Avatar>
                  <span className="text-4xl font-headline italic">{score}</span>
                </div>
                <div className="text-slate-300 font-headline text-4xl italic">VS</div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-20 h-20 border-4 border-slate-100 opacity-40">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <span className="text-4xl font-headline italic text-slate-300">--</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* AI Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-lg rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
              <CardTitle className="font-headline text-2xl tracking-wide flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-primary" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">Avg Speed</p>
                  <p className="text-3xl font-headline italic">{stats.avgTime}s</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1">XP Gained</p>
                  <p className="text-3xl font-headline italic text-primary">+{isDaily ? (score / 2) : 25}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg rounded-3xl bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-6">
              <CardTitle className="font-headline text-2xl tracking-wide">Coach Insights</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <AiInsights analyticsInput={analyticsInput} />
            </CardContent>
          </Card>
        </div>

        {/* Charts & Graphs */}
        <Card className="border-none shadow-lg rounded-3xl bg-white p-6">
          <CardTitle className="font-headline text-2xl tracking-wide mb-6">Speed Analysis</CardTitle>
          <SpeedChart yourData={yourSpeedData} opponentData={isDaily ? [] : opponentSpeedData} />
        </Card>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button onClick={handlePlayAgain} size="lg" className="rounded-full px-12 h-16 text-lg font-headline italic tracking-widest uppercase">
            {isDaily ? 'Retry Challenge' : 'Find New Match'}
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-12 h-16 text-lg font-headline italic tracking-widest uppercase border-2">
            <Link href="/arena">Exit to Arena</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
