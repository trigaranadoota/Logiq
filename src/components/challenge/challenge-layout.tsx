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
        // Push a dummy state so popstate fires when back is pressed
        history.pushState(null, '', window.location.href);

        const handlePopState = () => {
            if (isLeavingRef.current) return;
            // Back was pressed — show dialog.
            // History has already moved back 1 step (dummy → challenge page).
            setDialogOpen(true);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Called when the dialog closes for ANY reason (Cancel, Escape, backdrop, or Leave)
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            if (!isLeavingRef.current) {
                // User dismissed without confirming — re-arm the guard
                history.pushState(null, '', window.location.href);
            }
        }
        setDialogOpen(open);
    };

    // User confirmed they want to leave
    const handleLeave = () => {
        isLeavingRef.current = true;
        // Replace challenge entry in history with /arena so back never returns here
        router.replace('/arena');
    };

    // User clicked the in-app Back button
    const handleBackClick = () => {
        setDialogOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <AlertDialog open={dialogOpen} onOpenChange={handleOpenChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Want to leave this challenge?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        {/* AlertDialogCancel closes the dialog via Radix; handleOpenChange re-arms the guard */}
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLeave}>Leave</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Manual Back Button */}
            <div className="flex items-center justify-start w-full max-w-3xl mx-auto">
                <Button variant="ghost" onClick={handleBackClick}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>

            {children}
        </div>
    );
}
