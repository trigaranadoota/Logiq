'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNavigation } from '@/components/providers/navigation-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Swords,
    BrainCircuit,
    Trophy,
    ChevronRight,
    Zap,
    Shield,
    TrendingUp,
    Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LandingPage() {
    const { hasVisitedLanding, markLandingVisited } = useNavigation();
    const router = useRouter();
    const [isInitialVisit] = useState(!hasVisitedLanding);

    useEffect(() => {
        if (!isInitialVisit) {
            router.replace('/arena');
        } else {
            markLandingVisited();
            const timer = setTimeout(() => {
                router.push('/arena');
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isInitialVisit, router, markLandingVisited]);

    if (!isInitialVisit) {
        return null; // Return null for a cleaner "skip"
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
            <div className="relative flex flex-col items-center">
                {/* Brain Logo Animation - Appears first and scales in */}
                <div className="animate-in fade-in zoom-in duration-500 ease-out fill-mode-forwards">
                    <Image
                        src="/brain.png"
                        alt="Brain Logo"
                        width={220}
                        height={220}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Action Buttons - Appear last */}
                <div className="flex flex-col gap-3 w-64 mt-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-1000 fill-mode-both">
                    <Button
                        asChild
                        className="py-6 rounded-2xl bg-primary text-primary-foreground font-headline text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        <Link href="/arena">Play Now</Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="py-6 rounded-2xl border-2 font-headline text-lg hover:bg-slate-50 transition-all"
                    >
                        <Link href="/arena">Quick Start</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
