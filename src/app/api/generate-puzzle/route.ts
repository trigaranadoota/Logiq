import { NextResponse } from 'next/server'
import { generatePuzzle } from '@/lib/groq'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (!type) {
        return NextResponse.json({ error: 'Type is required' }, { status: 400 })
    }

    try {
        const puzzle = await generatePuzzle(type)
        return NextResponse.json(puzzle)
    } catch (error) {
        console.error('Groq Error:', error)
        return NextResponse.json({ error: 'AI Generation failed' }, { status: 500 })
    }
}
