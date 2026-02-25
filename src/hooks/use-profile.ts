'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/lib/types';

export function useProfile() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate local user data
        const mockUser = {
            id: 'mock-id',
            name: 'Pro Player',
            username: '@champion',
            avatarUrl: 'https://picsum.photos/seed/pro/200/200',
            bannerUrl: 'https://picsum.photos/seed/banner/1200/300',
            xp: 1250,
            streak: 5,
            level: 12,
            rank: { name: 'Master', tier: 'II', rating: 2450, progress: 65 },
            stats: { maxStreak: 12, totalXp: 45000, leagueName: 'Diamond', totalGames: 142 },
            ratings: [
                { category: 'Aptitude', rating: 1100 },
                { category: 'Logical Reasoning', rating: 1250 },
                { category: 'Memory', rating: 950 },
                { category: 'Problem Solving', rating: 1300 }
            ],
            recentMatches: [
                { id: '1', opponent: { name: 'Alex_G', avatarUrl: 'https://picsum.photos/seed/alex/100/100' }, type: 'Logic Puzzle', result: 'win', score: '24-18' },
                { id: '2', opponent: { name: 'Sam_K', avatarUrl: 'https://picsum.photos/seed/sam/100/100' }, type: 'Aptitude Sprint', result: 'loss', score: '15-22' }
            ],
            followers: 124,
            following: 89,
            goals: 'Aspiring to reach the Grandmaster league by the end of the season.'
        };
        
        setUser(mockUser);
        setLoading(false);
    }, []);

    return { user, loading };
}
