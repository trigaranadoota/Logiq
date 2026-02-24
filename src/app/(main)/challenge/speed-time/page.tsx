'use client';

import { Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChallengeLayout } from '@/components/challenge/challenge-layout';

export default function SpeedTimePage() {
    return (
        <ChallengeLayout>
            <div className="text-center flex flex-col items-center justify-center pt-8">
                <Timer className="w-20 h-20 text-primary mb-4" />
                <h1 className="text-5xl font-headline text-foreground mb-2">
                    Speed & Time Trial
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                    Calculate speeds, distances, and times under pressure. Solve the problem before your opponent and demonstrate your numerical precision.
                </p>
                <Card className="w-full max-w-3xl text-left">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Solve the Problem
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-muted/50 rounded-md h-48 flex items-center justify-center px-6">
                            <p className="text-muted-foreground text-lg text-center">
                                A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less. What is the speed of the train?
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-around gap-4">
                            <Button variant="outline" size="lg" className="w-full sm:w-1/4">
                                40 km/h
                            </Button>
                            <Button variant="outline" size="lg" className="w-full sm:w-1/4">
                                45 km/h
                            </Button>
                            <Button variant="outline" size="lg" className="w-full sm:w-1/4">
                                36 km/h
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <div className="mt-8">
                    <Button asChild size="lg" className="rounded-full px-12">
                        <Link href="/duel/speed-time/results">Submit & See Results</Link>
                    </Button>
                </div>
            </div>
        </ChallengeLayout>
    );
}
