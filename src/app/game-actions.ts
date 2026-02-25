'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveMatchResult(data: {
    gameType: string,
    winnerId: string | null,
    score: any,
    xpGained: number,
    streakIncrement: boolean
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    const actualWinnerId = data.winnerId === 'self' ? user.id : data.winnerId;

    // 1. Record the match
    const { error: matchError } = await supabase
        .from('matches')
        .insert({
            player1_id: user.id,
            winner_id: actualWinnerId,
            game_type: data.gameType,
            score: data.score
        })

    if (matchError) return { error: matchError.message }

    // 2. Update user profile (XP and Streak)
    const { data: profile } = await supabase
        .from('profiles')
        .select('xp, streak, max_streak')
        .eq('id', user.id)
        .single()

    if (profile) {
        const newStreak = data.streakIncrement ? profile.streak + 1 : 0
        const newMaxStreak = Math.max(profile.max_streak, newStreak)

        await supabase
            .from('profiles')
            .update({
                xp: profile.xp + data.xpGained,
                streak: newStreak,
                max_streak: newMaxStreak
            })
            .eq('id', user.id)
    }

    revalidatePath('/profile')
    return { success: true }
}
