-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  max_streak INTEGER DEFAULT 0,
  lifetime_stats JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player1_id UUID REFERENCES profiles(id) NOT NULL,
  player2_id UUID REFERENCES profiles(id), -- Null for AI or solo
  winner_id UUID REFERENCES profiles(id),
  game_type TEXT NOT NULL,
  score JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on matches
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Matches are viewable by participants" 
ON matches FOR SELECT USING (
  auth.uid() = player1_id OR auth.uid() = player2_id
);

-- Create follows table
CREATE TABLE IF NOT EXISTS follows (
  follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (follower_id, following_id)
);

-- Enable RLS on follows
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public follow data viewable" ON follows FOR SELECT USING (true);
CREATE POLICY "Users can follow others" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow" ON follows FOR DELETE USING (auth.uid() = follower_id);

-- Create saved_questions table
CREATE TABLE IF NOT EXISTS saved_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on saved_questions
ALTER TABLE saved_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved questions" ON saved_questions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save questions" ON saved_questions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete saved questions" ON saved_questions FOR DELETE USING (auth.uid() = user_id);

-- Create questions bank table
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hash TEXT UNIQUE NOT NULL, -- To prevent repetition
  type TEXT NOT NULL,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Everyone can view questions" ON questions FOR SELECT USING (true);

-- Create match_queue table
CREATE TABLE IF NOT EXISTS match_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  game_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE match_queue ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see queue" ON match_queue FOR SELECT USING (true);
CREATE POLICY "Users can join queue" ON match_queue FOR INSERT WITH CHECK (auth.uid() = player_id);
CREATE POLICY "Users can leave queue" ON match_queue FOR DELETE USING (auth.uid() = player_id);

-- Update matches table for real-time
ALTER TABLE matches ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active'; -- active, finished
ALTER TABLE matches ADD COLUMN IF NOT EXISTS question_ids UUID[] DEFAULT '{}';
ALTER TABLE matches ADD COLUMN IF NOT EXISTS start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create daily_challenges table
CREATE TABLE IF NOT EXISTS daily_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  game_type TEXT NOT NULL,
  question_ids UUID[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Daily challenges are viewable by everyone" ON daily_challenges FOR SELECT USING (true);

-- Enable Realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE matches;
ALTER PUBLICATION supabase_realtime ADD TABLE match_queue;
ALTER PUBLICATION supabase_realtime ADD TABLE daily_challenges;
