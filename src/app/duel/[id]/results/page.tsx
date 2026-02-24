import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SpeedChart } from "@/components/analytics/speed-chart";
import { StatsTable } from "@/components/analytics/stats-table";
import AiInsights from "@/components/analytics/ai-insights";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function ResultsPage({ params }: { params: { id: string } }) {

  // Mock data for the duel results
  const yourData = {
    name: 'You',
    avatar: 'https://picsum.photos/seed/you/150/150',
    elo: 1224,
  };

  const opponentData = {
    name: 'Alex_G',
    avatar: 'https://picsum.photos/seed/opponent/150/150',
    elo: 1195,
  };

  const matchData = {
    yourScore: 20,
    opponentScore: 17,
    eloChange: 24,
  };

  // Generate consistent random data based on duel ID
  const yourSpeedData = Array.from({ length: 60 }, (_, i) => Math.floor(Math.sin((i + parseInt(params.id, 10)) * 0.5) * 10 + 90));
  const opponentSpeedData = Array.from({ length: 60 }, (_, i) => Math.floor(Math.cos((i + parseInt(params.id, 10)) * 0.4) * 12 + 88));

  const yourStats = {
    avgTime: 2.5,
    fastest: 0.8,
    slowest: 4.2,
  };

  const opponentStats = {
    avgTime: 2.8,
    fastest: 1.1,
    slowest: 5.1,
  };

  const analyticsInput = {
    userScore: matchData.yourScore,
    opponentScore: matchData.opponentScore,
    eloRatingChange: matchData.eloChange,
    yourSpeedData: yourSpeedData,
    opponentSpeedData: opponentSpeedData,
    averageTime: yourStats.avgTime,
    fastestAnswer: yourStats.fastest,
    slowestAnswer: yourStats.slowest,
    opponentAverageTime: opponentStats.avgTime,
    opponentFastestAnswer: opponentStats.fastest,
    opponentSlowestAnswer: opponentStats.slowest,
  }

  const won = matchData.yourScore > matchData.opponentScore;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
        {/* Header: Victory/Loss */}
        <Card className="text-center p-6 md:p-8 bg-card">
          <CardTitle className={`font-headline text-5xl mb-4 ${won ? 'text-accent' : 'text-destructive'}`}>{won ? 'Victory' : 'Defeat'}</CardTitle>
          <div className="flex justify-around items-center max-w-lg mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-20 h-20 border-4 border-primary">
                <AvatarImage src={yourData.avatar} alt={yourData.name} />
                <AvatarFallback>{yourData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="font-bold text-lg">{yourData.name}</p>
              <p className="text-sm text-muted-foreground">ELO: {yourData.elo}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-headline text-6xl">{`${matchData.yourScore} - ${matchData.opponentScore}`}</p>
              <p className={`font-bold text-xl ${won ? 'text-accent' : 'text-destructive'}`}>ELO {matchData.eloChange > 0 ? '+' : ''}{matchData.eloChange}</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-20 h-20">
                <AvatarImage src={opponentData.avatar} alt={opponentData.name} />
                <AvatarFallback>{opponentData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="font-bold text-lg">{opponentData.name}</p>
              <p className="text-sm text-muted-foreground">ELO: {opponentData.elo}</p>
            </div>
          </div>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl tracking-wide">AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <AiInsights analyticsInput={analyticsInput} />
          </CardContent>
        </Card>

        {/* Performance Graph */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl tracking-wide">Speed Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <SpeedChart yourData={yourSpeedData} opponentData={opponentSpeedData} />
          </CardContent>
        </Card>

        {/* Stat Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl tracking-wide">Detailed Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <StatsTable yourStats={yourStats} opponentStats={opponentStats} />
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4 pt-4">
          <Button variant="outline" className="rounded-full px-8">Rematch</Button>
          <Button asChild className="rounded-full px-8">
            <Link href="/arena">Back to Arena</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
