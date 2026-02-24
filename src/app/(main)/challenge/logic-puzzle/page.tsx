'use client';

import { BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChallengeLayout } from '@/components/challenge/challenge-layout';

export default function LogicPuzzlePage() {
  return (
    <ChallengeLayout>
      <div className="text-center flex flex-col items-center justify-center pt-8">
        <BrainCircuit className="w-20 h-20 text-primary mb-4" />
        <h1 className="text-5xl font-headline text-foreground mb-2">
          Logic Puzzle Challenge
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Get ready to test your wits! You'll be presented with a series of
          logic puzzles. Read each one carefully and select the correct answer.
        </p>
        <Card className="w-full max-w-3xl text-left">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Your Puzzle Will Appear Here
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-md h-48 flex items-center justify-center">
              <p className="text-muted-foreground">
                The puzzle content is loading...
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-around gap-4">
              <Button variant="outline" size="lg" className="w-full sm:w-1/4">
                Option A
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-1/4">
                Option B
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-1/4">
                Option C
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8">
          <Button asChild size="lg" className="rounded-full px-12">
            <Link href="/duel/logic-puzzle/results">Submit & See Results</Link>
          </Button>
        </div>
      </div>
    </ChallengeLayout>
  );
}
