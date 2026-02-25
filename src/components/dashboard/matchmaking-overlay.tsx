"use client";

import React from "react";
import { BrainCircuit, Zap, Hash, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchmakingOverlayProps {
    gameTitle: string;
    gameId: string;
    isVisible: boolean;
}

const gameIcons: Record<string, React.ReactNode> = {
    "logic-puzzle": <BrainCircuit className="w-12 h-12 text-primary" />,
    "aptitude-sprint": <Zap className="w-12 h-12 text-primary" />,
    "number-series": <Hash className="w-12 h-12 text-primary" />,
    "speed-time": <Timer className="w-12 h-12 text-primary" />,
};

export function MatchmakingOverlay({
    gameTitle,
    gameId,
    isVisible,
}: MatchmakingOverlayProps) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md animate-in fade-in duration-500">
            {/* Pulse Animation Wrapper */}
            <div className="relative flex items-center justify-center mb-12">
                {/* Pulsing Circles */}
                <div className="absolute w-64 h-64 border-2 border-primary/20 rounded-full animate-ping duration-[3000ms]" />
                <div className="absolute w-48 h-48 border-2 border-primary/40 rounded-full animate-ping duration-[2000ms]" />
                <div className="absolute w-32 h-32 border-2 border-primary/60 rounded-full animate-ping duration-1000" />

                {/* Central Icon Container */}
                <div className="relative z-10 p-8 rounded-full bg-card border border-border shadow-2xl flex items-center justify-center">
                    {gameIcons[gameId] || <BrainCircuit className="w-12 h-12 text-primary" />}
                </div>
            </div>

            {/* Text Info */}
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-headline text-foreground tracking-tight">
                    {gameTitle}
                </h2>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xl text-primary font-medium animate-pulse">
                        Finding Opponent...
                    </p>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">
                        Please Wait
                    </p>
                </div>
            </div>

            {/* Bottom Tip (Optional) */}
            <div className="absolute bottom-12 text-muted-foreground text-sm font-medium opacity-70 italic px-6 text-center">
                Tip: Fast and accurate answers earn more ranking points!
            </div>
        </div>
    );
}
