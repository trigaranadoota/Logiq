'use client';

import { Hash, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

export default function NumberSeriesPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-start w-full max-w-3xl mx-auto">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Want to leave this challenge?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => router.back()}>
                                Leave
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

            <div className="text-center flex flex-col items-center justify-center pt-8">
                <Hash className="w-20 h-20 text-primary mb-4" />
                <h1 className="text-5xl font-headline text-foreground mb-2">
                    Number Series Duel
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                    Find the next number in the sequence — fast! Study the pattern carefully and choose the correct answer before your opponent does.
                </p>
                <Card className="w-full max-w-3xl text-left">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            What comes next in the sequence?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-muted/50 rounded-md h-48 flex items-center justify-center">
                            <p className="text-muted-foreground text-xl tracking-widest font-mono">
                                2, 4, 8, 16, 32, ?
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-around gap-4">
                            <Button variant="outline" size="lg" className="w-full sm:w-1/4">
                                48
                            </Button>
                            <Button variant="outline" size="lg" className="w-full sm:w-1/4">
                                64
                            </Button>
                            <Button variant="outline" size="lg" className="w-full sm:w-1/4">
                                56
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <div className="mt-8">
                    <Button asChild size="lg" className="rounded-full px-12">
                        <Link href="/duel/1/results">Submit & See Results</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
