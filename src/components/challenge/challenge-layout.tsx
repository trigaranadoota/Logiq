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
    // Track whether the user confirmed leaving so we don't re-intercept
    const isLeavingRef = useRef(false);

    useEffect(() => {
        // Push a dummy state so we can intercept the first "back" press
        history.pushState(null, '', window.location.href);

        const handlePopState = () => {
            if (isLeavingRef.current) return;
            // Re-push dummy state to prevent leaving
            history.pushState(null, '', window.location.href);
            // Show the confirmation dialog
            setDialogOpen(true);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleLeave = () => {
        isLeavingRef.current = true;
        // Go back twice: once for the dummy state, once for real navigation
        history.go(-2);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Confirmation Dialog — triggered by both the Back button and browser back */}
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

            {/* Manual Back Button */}
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
