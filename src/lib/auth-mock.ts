"use client";

export const MOCK_USER = {
  id: "user_123",
  email: "demo@logiq.ai",
  username: "LogicMaster",
  full_name: "Demo User",
  avatar_url: "/brain.png",
  stats: {
    rank: "Master",
    points: 1250,
    matches: 42,
    winRate: "76%",
    streak: 5
  }
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
