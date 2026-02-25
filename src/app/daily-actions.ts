'use server'

import { createClient } from '@/lib/supabase/server'
import { generatePuzzle } from '@/lib/groq'
import crypto from 'crypto'

export async function getDailyQuestions(gameType: string) {
    const supabase = await createClient()
    const today = new Date().toISOString().split('T')[0]

    // 1. Check if daily challenge already exists for today
    const { data: daily, error: dailyError } = await supabase
        .from('daily_challenges')
        .select('question_ids')
        .eq('date', today)
        .eq('game_type', gameType)
        .single()

    if (daily && daily.question_ids.length > 0) {
        // Return existing questions
        const { data: questions } = await supabase
            .from('questions')
            .select('*')
            .in('id', daily.question_ids)

        // Sort them
        const sorted = daily.question_ids.map(id => questions?.find(q => q.id === id)).filter(Boolean)
        return { questions: sorted.map(q => ({ ...q.content, id: q.id })) }
    }

    // 2. If not, generate new batch of 5 questions for the day
    const newQs = await Promise.all([
        generateAndStoreDailyQuestion(gameType),
        generateAndStoreDailyQuestion(gameType),
        generateAndStoreDailyQuestion(gameType),
        generateAndStoreDailyQuestion(gameType),
        generateAndStoreDailyQuestion(gameType)
    ])

    const questionIds = newQs.map(q => q.id).filter(Boolean)

    // 3. Save to daily_challenges
    await supabase
        .from('daily_challenges')
        .upsert({
            date: today,
            game_type: gameType,
            question_ids: questionIds
        }, { onConflict: 'date,game_type' })

    return { questions: newQs.map(q => ({ ...q.content, id: q.id })) }
}

async function generateAndStoreDailyQuestion(type: string) {
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
