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
            router.push('/arena');
        } else {
            markLandingVisited();
            // Brain appears (0s)
            // Text flashes in (0.5s)
            // Both stay for 1s (1.5s total)
            // Redirect at 2.5s to be safe
            const timer = setTimeout(() => {
                router.push('/arena');
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [isInitialVisit, router, markLandingVisited]);

    if (!isInitialVisit) {
        return <div className="min-h-screen bg-white" />;
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

                {/* "Logiq" Text Animation - "Flash" entrance from the right */}
                <div className="flex items-center justify-center h-16 overflow-hidden">
                    <div className="animate-in slide-in-from-right-full fade-in duration-200 delay-500 ease-[cubic-bezier(0.19,1,0.22,1)] fill-mode-both">
                        <Image
                            src="/logiq-text.png"
                            alt="Logiq Text"
                            width={220}
                            height={110}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
