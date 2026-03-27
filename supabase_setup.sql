-- ============================================================
-- SUPABASE DATABASE SETUP (Clean Slate Version)
-- ============================================================
-- This script will first CLEAN UP existing tables and then
-- recreate them with the correct schema to avoid errors.
-- WARNING: This will delete existing data in these 4 tables.
-- ============================================================

-- 0. CLEANUP (Ensures no "already exists" or "column does not exist" errors)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop table if exists public.follows cascade;
drop table if exists public.saved_questions cascade;
drop table if exists public.matches cascade;
drop table if exists public.profiles cascade;

-- 1. PROFILES TABLE
-- Primary key is 'id', which links to Supabase Auth.
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  name text,
  avatar_url text,
  banner_url text,
  level integer default 1,
  xp integer default 0,
  streak integer default 0,
  max_streak integer default 0,
  league_name text default 'Bronze',
  total_games integer default 0,
  followers_count integer default 0,
  following_count integer default 0,
  goals text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. MATCHES TABLE
create table public.matches (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users (id) on delete cascade not null,
  opponent_id uuid,
  opponent_name text,
  opponent_avatar_url text,
  match_type text not null, -- 'daily', 'sprint', '1v1'
  user_score text,
  result text check (result in ('win', 'loss', 'tie')),
  played_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. SAVED QUESTIONS TABLE
create table public.saved_questions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users (id) on delete cascade not null,
  question_id text not null,
  question_title text,
  category text,
  difficulty text,
  saved_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, question_id)
);

-- 4. FOLLOWS TABLE
create table public.follows (
  follower_id uuid references auth.users (id) on delete cascade not null,
  following_id uuid references auth.users (id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (follower_id, following_id)
);

-- 5. PERFORMANCE INDEXES
create index idx_matches_user_id on public.matches(user_id);
create index idx_saved_questions_user_id on public.saved_questions(user_id);
create index idx_follows_follower_id on public.follows(follower_id);
create index idx_follows_following_id on public.follows(following_id);

-- 6. SECURITY (ROW LEVEL SECURITY)
alter table public.profiles enable row level security;
alter table public.matches enable row level security;
alter table public.saved_questions enable row level security;
alter table public.follows enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);
create policy "Users can view own matches." on matches for select using (auth.uid() = user_id);
create policy "Users can view own saved questions." on saved_questions for select using (auth.uid() = user_id);
create policy "Follows are viewable by everyone." on follows for select using (true);
create policy "Users can follow others." on follows for insert with check (auth.uid() = follower_id);
create policy "Users can unfollow others." on follows for delete using (auth.uid() = follower_id);

-- 7. AUTOMATIC PROFILE CREATION
-- This function runs every time a new user signs up.
create or replace function public.handle_new_user()
returns trigger as $$
declare
    new_username text;
begin
  -- Generate a safe username from full_name or email
  new_username := '@' || lower(replace(coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)), ' ', '')) || substr(new.id::text, 1, 4);

  insert into public.profiles (id, name, avatar_url, username)
  values (
    new.id, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', 
    new_username
  );
  return new;
end;
$$ language plpgsql security definer;

-- Re-attach Trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
