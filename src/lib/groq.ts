import Groq from 'groq-sdk'

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export async function generatePuzzle(type: string) {
    const promptMap: Record<string, string> = {
        'logic-puzzle': 'Generate a challenging logic puzzle with 3 clues and 4 possible answers. Return as JSON: { "question": "...", "clues": ["...", "...", "..."], "options": ["...", "...", "...", "..."], "correctAnswer": "..." }',
        'number-series': 'Generate a complex number series puzzle. Return as JSON: { "series": "...", "options": ["...", "...", "...", "..."], "correctAnswer": "...", "explanation": "..." }',
    }

    const prompt = promptMap[type] || 'Generate a difficult aptitude question. Return as JSON.'

    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'You are an expert puzzle generator for a high-performance brain training app. You must ONLY return raw JSON.',
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
        model: 'llama3-70b-8192',
        response_format: { type: 'json_object' },
    })

    return JSON.parse(chatCompletion.choices[0].message.content || '{}')
}
