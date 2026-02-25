'use server'

import { createClient } from '@/lib/supabase/server'
import { generatePuzzle } from '@/lib/groq'
import crypto from 'crypto'

export async function getMatchQuestions(matchId: string) {
    const supabase = await createClient()

    const { data: match, error: matchError } = await supabase
        .from('matches')
        .select('question_ids')
        .eq('id', matchId)
        .single()

    if (matchError || !match) return { error: 'Match not found' }

    const { data: questions, error: qError } = await supabase
        .from('questions')
        .select('*')
        .in('id', match.question_ids)

    if (qError) return { error: qError.message }

    // Sort them to match the order in question_ids
    const sortedQuestions = match.question_ids.map((id: string) => questions.find(q => q.id === id)).filter(Boolean)

    return {
        questions: sortedQuestions.map((q: any) => {
            const content = q.content as any;
            return { ...content, id: q.id };
        })
    }
}

export async function extendMatchQuestions(matchId: string, gameType: string) {
    const supabase = await createClient()

    // Generate 2 more questions
    const newQs = await Promise.all([
        generateAndStoreSyncQuestion(gameType),
        generateAndStoreSyncQuestion(gameType)
    ])

    const { data: currentMatch } = await supabase
        .from('matches')
        .select('question_ids')
        .eq('id', matchId)
        .single()

    const updatedIds = [...(currentMatch?.question_ids || []), ...newQs.map(q => q.id)]

    await supabase
        .from('matches')
        .update({ question_ids: updatedIds })
        .eq('id', matchId)

    return { success: true, newQuestions: newQs.map(q => ({ ...q.content, id: q.id })) }
}

async function generateAndStoreSyncQuestion(type: string) {
    const supabase = await createClient()

    const puzzle = await generatePuzzle(type)
    const hash = crypto.createHash('md5').update(JSON.stringify(puzzle)).digest('hex')

    const { data: existing } = await supabase
        .from('questions')
        .select('id, content')
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
        .select('id, content')
        .single()

    return newQuestion || { id: null, content: puzzle }
}
