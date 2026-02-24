"use client";

import React, { useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { TodayChallenge } from "@/components/dashboard/today-challenge";

export default function ArenaPage() {
    useEffect(() => {
        // Arm the trap by pushing a dummy state
        window.history.pushState({ homeGuard: true }, '', window.location.href);

        const handlePopState = (event: PopStateEvent) => {
            // Always force the user back to the top of the stack on the Arena
            window.history.pushState({ homeGuard: true }, '', window.location.href);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    return (
        <div className="container mx-auto px-4 py-6 space-y-8">
            <DashboardHeader />
            <TodayChallenge />
        </div>
    );
}
