export type User = {
  id: string;
  name: string;
  username?: string;
  avatarUrl: string;
  bannerUrl?: string;
  role: string;
  skills: string[];
  goals: string;
  experience: string;
  online?: boolean;
  following: number;
  followers: number;

  education?: string;
  targetRole?: string;
  experienceLevel?: 'Student' | 'Fresher' | 'Professional';
  links?: {
    email: string;
    linkedin?: string;
    portfolio?: string;
    website?: string;
  };
  preferences?: {
    interests: string[];
    preparingFor: string[];
    mockInterviews: boolean;
  };
  privacy?: {
    public: boolean;
    showStats: boolean;
    allowRequests: boolean;
  };

  rank?: {
    name: string;
    tier: string;
    progress: number;
    rating: number;
  };
  competitiveRecord?: {
    wins: number;
    ties: number;
    losses: number;
  };
  ratings?: {
    category: string;
    rating: number;
  }[];
  stats?: {
    maxStreak: number;
    totalXp: number;
    leagueName: string;
    totalGames: number;
  };
  recentMatches?: Match[];
};

export type Match = {
  id: string;
  opponent: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  score: string;
  result: 'win' | 'loss' | 'tie';
  type: string;
};

export type Connection = {
  id: string;
  userId: string;
  status: 'pending' | 'connected';
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
};

export type Conversation = {
  userId: string;
  messages: Message[];
};
