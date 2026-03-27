import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { topic, difficulty } = await req.json();

    // Groq API Key must be set in Supabase Secrets
    const groqApiKey = Deno.env.get('GROQ_API_KEY');
    
    if (!groqApiKey) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    const prompt = `Generate a ${difficulty} difficulty JSON question about ${topic}. The JSON should have the exact following shape: { "question_text": "...", "options": ["A", "B", "C", "D"], "correct_answer": "...", "explanation": "..." }`;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192', // or any other model available on Groq
        messages: [{ role: 'system', content: 'You are a strict JSON output AI.' }, { role: 'user', content: prompt }],
        response_format: { type: "json_object" }
      }),
    });

    const data = await groqResponse.json();
    const resultContent = data.choices[0].message.content;
    const jsonQuestion = JSON.parse(resultContent);

    // Later: You can initialize supabase client here and insert the generated question into the ai_questions table
    // import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
    // const supabaseClient = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_ANON_KEY'));
    // await supabaseClient.from('ai_questions').insert({...jsonQuestion, prompt, category: topic, difficulty});

    return new Response(JSON.stringify(jsonQuestion), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
