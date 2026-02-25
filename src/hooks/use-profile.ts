'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@/lib/types'

export function useProfile() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchProfile() {
            const { data: { user: authUser } } = await supabase.auth.getUser()

            if (!authUser) {
                setLoading(false)
                return
            }

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single()

            if (profile) {
                // Map Supabase profile to UI User type
                const mappedUser: User = {
                    id: profile.id,
                    name: profile.username,
                    username: '@' + profile.username,
                    avatarUrl: profile.avatar_url || '/brain.png',
                    bannerUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000',
                    role: 'Logiq Member',
                    skills: ['Aptitude', 'Logic'],
                    experience: '2 years',
                    followers: 0,
                    following: 0,
                    goals: 'Complete daily challenges and reach the Master league!',
                    rank: {
                        name: 'Bronze',
                        tier: 'I',
                        rating: 1200,
                        progress: 45
                    },
                    ratings: [
                        { category: 'Aptitude', rating: 1200 },
                        { category: 'Logical Reasoning', rating: 1150 },
                        { category: 'Memory', rating: 1050 },
                        { category: 'Problem Solving', rating: 1100 }
                    ],
                    stats: {
                        maxStreak: profile.max_streak,
                        totalXp: profile.xp,
                        totalGames: 0,
                        leagueName: 'Bronze League'
                    },
                    recentMatches: []
                }
                setUser(mappedUser)
            }
            setLoading(false)
        }

        fetchProfile()
    }, [])

    return { user, loading }
}
