import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  // 1. Setup Supabase database connection
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  const supabase = createClient(supabaseUrl, supabaseKey)

  // 2. Setup Groq AI connection
  const groqApiKey = Deno.env.get('GROQ_API_KEY')

  // 3. Ask Groq to generate questions
  const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "llama3-8b-8192", // Fast, free Groq model
      messages: [{ 
        role: "user", 
        content: "Generate 5 Number Series questions. Output ONLY a JSON array with 'question', 'options' (array of 4), and 'correct_answer'." 
      }]
    })
  });

  const aiData = await aiResponse.json();
  const questions = JSON.parse(aiData.choices[0].message.content);

  // 4. Save the questions to your daily_challenges table
  const today = new Date().toISOString().split('T')[0];
  await supabase.from('daily_challenges').insert({
    mode: 'Number Series',
    active_date: today,
    questions: questions
  });

  return new Response("Daily questions generated successfully!", { status: 200 })
})