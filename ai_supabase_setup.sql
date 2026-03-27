-- ============================================================
-- SUPABASE AI DATABASE SETUP
-- Includes pgvector and tables for Groq AI questions
-- ============================================================

-- 1. EXTENSIONS (For future AI/RAG support)
-- The vector extension allows storing and querying dense vectors (embeddings).
create extension if not exists vector with schema extensions;

-- 2. AI QUESTIONS TABLE
-- Stores AI-generated questions from Groq
create table if not exists public.ai_questions (
  id uuid default gen_random_uuid() primary key,
  prompt text not null,               -- Original prompt or context used to generate the question
  question_text text not null,        -- The generated question
  options jsonb,                      -- E.g., ['A', 'B', 'C', 'D'] if multiple choice
  correct_answer text,                -- The correct answer
  explanation text,                   -- AI-generated explanation of the answer
  category text,                      -- E.g., 'number-series', 'math'
  difficulty text check (difficulty in ('easy', 'medium', 'hard', 'expert')),
  embedding vector(1536),             -- Optional: to store sentence embeddings later
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references auth.users(id) on delete set null
);

-- 3. INDEXES
-- Index for quick lookups by category and difficulty
create index idx_ai_questions_category on public.ai_questions(category);
create index idx_ai_questions_difficulty on public.ai_questions(difficulty);
-- HNSW Index for vector similarity search (useful if we enable RAG later)
-- Uses vector_ip_ops but vector_cosine_ops or vector_l2_ops could be used.
create index idx_ai_questions_embedding on public.ai_questions using hnsw (embedding vector_cosine_ops);

-- 4. SECURITY (ROW LEVEL SECURITY)
alter table public.ai_questions enable row level security;

-- Policies
-- Anyone can view AI questions
create policy "AI questions are viewable by everyone." on public.ai_questions for select using (true);

-- Only authenticated users (or specific roles) can insert newly generated AI questions via Edge Functions
-- Edge functions will use a service role key if needed to bypass RLS, but standard auth policy:
create policy "Authenticated users can create AI questions." on public.ai_questions for insert with check (auth.role() = 'authenticated');
