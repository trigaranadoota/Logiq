'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ChallengeLayoutProps {
    children: React.ReactNode;
}

export function ChallengeLayout({ children }: ChallengeLayoutProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const isLeavingRef = useRef(false);

    useEffect(() => {
        // Push one dummy state. History is now: [..., /arena, /challenge, dummy]
        // Current position is at "dummy".
        history.pushState({ challengeGuard: true }, '', window.location.href);

        const handlePopState = () => {
            if (isLeavingRef.current) return;

            // User pressed back — they moved from "dummy" back to "/challenge".
            // Immediately re-push the dummy to restore position to the top.
            // History is always kept as: [..., /arena, /challenge, dummy]
            history.pushState({ challengeGuard: true }, '', window.location.href);

            setDialogOpen(true);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleLeave = () => {
        isLeavingRef.current = true;
        setDialogOpen(false);
        // Go back 2 steps: dummy → /challenge → /arena
        // History is always [..., /arena, /challenge, dummy], so -2 always lands on /arena.
        history.go(-2);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Want to leave this challenge?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLeave}>Leave</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* In-app Back Button */}
            <div className="flex items-center justify-start w-full max-w-3xl mx-auto">
                <Button variant="ghost" onClick={() => setDialogOpen(true)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>

            {children}
        </div>
    );
}
