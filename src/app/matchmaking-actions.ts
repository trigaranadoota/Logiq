'use server'

import { createClient } from '@/lib/supabase/server'
import { generatePuzzle } from '@/lib/groq'
import crypto from 'crypto'

export async function joinQueue(gameType: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    const { error } = await supabase
        .from('match_queue')
        .upsert({
            player_id: user.id,
            game_type: gameType,
        })

    if (error) return { error: error.message }
    return { success: true }
}

export async function leaveQueue() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    await supabase
        .from('match_queue')
        .delete()
        .eq('player_id', user.id)

    return { success: true }
}

export async function findMatch(gameType: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Not authenticated' }

    // 1. Look for an opponent in the queue
    const { data: opponent } = await supabase
        .from('match_queue')
        .select('player_id')
        .eq('game_type', gameType)
        .neq('player_id', user.id)
        .order('created_at', { ascending: true })
        .limit(1)
        .single()

    if (!opponent) return { success: false, message: 'No opponent found yet' }

    // 2. Opponent found! Create the match and clean up queue
    // Generate initial questions
    const questions = await Promise.all([
        generateAndStoreQuestion(gameType),
        generateAndStoreQuestion(gameType),
        generateAndStoreQuestion(gameType)
    ])

    const { data: match, error: matchError } = await supabase
        .from('matches')
        .insert({
            player1_id: opponent.player_id,
            player2_id: user.id,
            game_type: gameType,
            question_ids: questions.map(q => q.id),
            status: 'active'
        })
        .select()
        .single()

    if (matchError) return { error: matchError.message }

    // 3. Remove both from queue
    await supabase.from('match_queue').delete().in('player_id', [user.id, opponent.player_id])

    return { success: true, matchId: match.id }
}

async function generateAndStoreQuestion(type: string) {
    const supabase = await createClient()
    const puzzle = await generatePuzzle(type)
    const hash = crypto.createHash('md5').update(JSON.stringify(puzzle)).digest('hex')

    // Check if hash exists to prevent duplicates (rudimentary deduplication)
    const { data: existing } = await supabase
        .from('questions')
        .select('id')
        .eq('hash', hash)
        .single()

    if (existing) return existing

    const { data: newQuestion } = await supabase
        .from('questions')
        .insert({
            hash,
            type,
            content: puzzle
        })
        .select('id')
        .single()

    return newQuestion || { id: null }
}
