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
        // Arm the guard with an initial dummy state
        history.pushState(null, '', window.location.href);

        const handlePopState = () => {
            if (isLeavingRef.current) return;

            // *** Key fix: immediately re-push dummy state before showing the dialog.
            // This means even if the user mashes back multiple times rapidly, each press
            // is intercepted — there's always a fresh dummy state in the stack.
            history.pushState(null, '', window.location.href);

            setDialogOpen(true);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleLeave = () => {
        isLeavingRef.current = true;
        // Replace current entry so the challenge page is gone from history
        router.replace('/arena');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Want to leave this challenge?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {/* Cancel: Radix closes the dialog; dummy state already re-pushed in popstate */}
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
