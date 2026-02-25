"use client";

export const MOCK_USER = {
  id: "user_123",
  email: "demo@logiq.ai",
  name: "Demo User",
  username: "@logicmaster",
  avatarUrl: "/brain.png",
  bannerUrl: "https://picsum.photos/seed/banner/1200/300",
  xp: 1250,
  streak: 5,
  level: 12,
  rank: { 
    name: "Master", 
    tier: "II", 
    rating: 2450, 
    progress: 65 
  },
  stats: { 
    maxStreak: 12, 
    totalXp: 45000, 
    leagueName: "Diamond", 
    totalGames: 142 
  },
  ratings: [
    { category: "Aptitude", rating: 1100 },
    { category: "Logical Reasoning", rating: 1250 },
    { category: "Memory", rating: 950 },
    { category: "Problem Solving", rating: 1300 }
  ],
  recentMatches: [
    { id: "1", opponent: { name: "Alex_G", avatarUrl: "https://picsum.photos/seed/alex/100/100" }, type: "Logic Puzzle", result: "win", score: "24-18" },
    { id: "2", opponent: { name: "Sam_K", avatarUrl: "https://picsum.photos/seed/sam/100/100" }, type: "Aptitude Sprint", result: "loss", score: "15-22" }
  ],
  followers: 124,
  following: 89,
  goals: "Aspiring to reach the Grandmaster league by the end of the season."
};

export const authMock = {
  signIn: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("logiq_auth_token", "mock_token_123");
      localStorage.setItem("logiq_user", JSON.stringify(MOCK_USER));
    }
  },
  signUp: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("logiq_auth_token", "mock_token_123");
      localStorage.setItem("logiq_user", JSON.stringify(MOCK_USER));
    }
  },
  signOut: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("logiq_auth_token");
      localStorage.removeItem("logiq_user");
    }
  },
  isLoggedIn: () => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("logiq_auth_token");
    }
    return false;
  },
  getUser: () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("logiq_user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
};
