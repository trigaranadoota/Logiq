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
import { useRouter } from 'next/navigation';

interface ChallengeLayoutProps {
    children: React.ReactNode;
}

export function ChallengeLayout({ children }: ChallengeLayoutProps) {
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const isLeavingRef = useRef(false);

    useEffect(() => {
        // Arm the guard by pushing a dummy state
        history.pushState({ challengeGuard: true }, '', window.location.href);

        const handlePopState = () => {
            if (isLeavingRef.current) return;

            // CRITICAL: Immediately re-push the dummy state before showing the dialog.
            // This ensures that even rapid back-presses are intercepted.
            history.pushState({ challengeGuard: true }, '', window.location.href);

            setDialogOpen(true);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleLeave = () => {
        isLeavingRef.current = true;
        setDialogOpen(false);
        // Go back one step to remove the dummy state, then replace the challenge URL with Arena
        history.go(-1);
        setTimeout(() => {
            router.replace('/arena');
        }, 50); // Small timeout to ensure history move completes before replace
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
