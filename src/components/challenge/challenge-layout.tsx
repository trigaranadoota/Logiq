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
            // Show the dialog — at this point history moved back by 1 (from dummy to real page)
            setDialogOpen(true);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleCancel = () => {
        // Re-arm the guard by pushing the dummy state again
        history.pushState(null, '', window.location.href);
        setDialogOpen(false);
    };

    const handleLeave = () => {
        isLeavingRef.current = true;
        // Replace current history entry with /arena so back never returns to this challenge
        router.replace('/arena');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <AlertDialog open={dialogOpen} onOpenChange={(open) => { if (!open) handleCancel(); }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Want to leave this challenge?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
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
