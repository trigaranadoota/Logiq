import type { User, Connection, Conversation, Match } from '@/lib/types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    username: '@sarah-chen',
    avatarUrl: 'https://picsum.photos/seed/user1/100/100',
    bannerUrl: 'https://picsum.photos/seed/banner1/1000/300',
    role: 'Senior Product Manager',
    skills: ['Product Strategy', 'Agile Methodologies', 'UX Design', 'Market Research'],
    goals: 'Preparing for placements at top tech firms. Focusing on quantitative aptitude and logical reasoning.',
    experience: '8+ years in product management at top-tier tech companies.',
    online: true,
    following: 124,
    followers: 850,
    education: 'M.S. in Human-Computer Interaction, Carnegie Mellon University',
    targetRole: 'Head of Product',
    experienceLevel: 'Professional',
    links: {
      email: 'sarah.chen@example.com',
      linkedin: 'linkedin.com/in/sarahchen',
      portfolio: 'sarahchen.design',
      website: 'sarahchen.io',
    },
    preferences: {
      interests: ['Aptitude', 'Coding', 'HR'],
      preparingFor: ['Placements', 'Tech Roles'],
      mockInterviews: true,
    },
    privacy: {
      public: true,
      showStats: true,
      allowRequests: true,
    },
    rank: {
      name: 'Amateur',
      tier: 'III',
      progress: 75,
      rating: 1250,
    },
    competitiveRecord: {
      wins: 42,
      ties: 3,
      losses: 15,
    },
    ratings: [
      { category: 'Aptitude', rating: 85 },
      { category: 'Logical Reasoning', rating: 92 },
      { category: 'Memory', rating: 78 },
      { category: 'Problem Solving', rating: 88 },
    ],
    stats: {
      maxStreak: 12,
      totalXp: 18500,
      leagueName: 'Diamond',
      totalGames: 60,
    },
    recentMatches: [
      {
        id: 'match-1',
        opponent: { id: 'user-2', name: 'David Lee', avatarUrl: 'https://picsum.photos/seed/user2/100/100' },
        score: '5-3',
        result: 'win',
        type: 'Logic Duel'
      },
      {
        id: 'match-2',
        opponent: { id: 'user-4', name: 'Tom Nguyen', avatarUrl: 'https://picsum.photos/seed/user4/100/100' },
        score: '4-5',
        result: 'loss',
        type: 'Aptitude'
      },
      {
        id: 'match-3',
        opponent: { id: 'user-6', name: 'Michael Brown', avatarUrl: 'https://picsum.photos/seed/user6/100/100' },
        score: '5-2',
        result: 'win',
        type: 'Problem Solving'
      }
    ]
  },
  {
    id: 'user-2',
    name: 'David Lee',
    avatarUrl: 'https://picsum.photos/seed/user2/100/100',
    role: 'Lead Software Engineer',
    skills: ['React', 'Node.js', 'GraphQL', 'System Architecture', 'DevOps'],
    goals: 'Contribute to open-source projects and mentor junior developers.',
    experience: '10 years of experience building scalable web applications.',
    online: true,
    following: 45,
    followers: 210,
  },
  {
    id: 'user-3',
    name: 'Maria Rodriguez',
    avatarUrl: 'https://picsum.photos/seed/user3/100/100',
    role: 'UX/UI Designer',
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    goals: 'Design accessible and user-centric digital products.',
    experience: '5 years of experience in the design industry.',
    online: false,
    following: 67,
    followers: 180,
  },
  {
    id: 'user-4',
    name: 'Tom Nguyen',
    avatarUrl: 'https://picsum.photos/seed/user4/100/100',
    role: 'Data Scientist',
    skills: ['Python', 'Machine Learning', 'Data Visualization', 'SQL'],
    goals: 'Apply AI to solve real-world business problems.',
    experience: '6 years of experience in data analytics and machine learning.',
    online: true,
    following: 89,
    followers: 340,
  },
  {
    id: 'user-5',
    name: 'Jessica Williams',
    avatarUrl: 'https://picsum.photos/seed/user5/100/100',
    role: 'Marketing Director',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Brand Management'],
    goals: 'Lead a global marketing team for a mission-driven brand.',
    experience: '12 years of experience in marketing and communications.',
    online: false,
    following: 156,
    followers: 420,
  },
  {
    id: 'user-6',
    name: 'Michael Brown',
    avatarUrl: 'https://picsum.photos/seed/user6/100/100',
    role: 'Junior Web Developer',
    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
    goals: 'Become a full-stack developer and work on exciting projects.',
    experience: '1 year of experience after completing a coding bootcamp.',
    online: true,
    following: 23,
    followers: 95,
  },
  {
    id: 'user-7',
    name: 'Emily Clark',
    avatarUrl: 'https://picsum.photos/seed/user7/100/100',
    role: 'DevOps Engineer',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    goals: 'Automate infrastructure and improve deployment pipelines.',
    experience: '4 years in cloud infrastructure and operations.',
    following: 56,
    followers: 120,
  },
  {
    id: 'user-8',
    name: 'Alex Johnson',
    avatarUrl: 'https://picsum.photos/seed/user8/100/100',
    role: 'Founder & CEO',
    skills: ['Leadership', 'Fundraising', 'Business Strategy'],
    goals: 'Scale a startup from 0 to 1 and build a great company culture.',
    experience: 'Founder of two successful startups.',
    following: 230,
    followers: 1050,
  }
];

export const loggedInUser: User = users[0];

export const connections: Connection[] = [
  { id: 'conn-1', userId: 'user-2', status: 'connected' },
  { id: 'conn-2', userId: 'user-3', status: 'connected' },
  { id: 'conn-3', userId: 'user-7', status: 'pending' },
  { id: 'conn-4', userId: 'user-8', status: 'pending' },
];

export const conversations: Conversation[] = [
  {
    userId: 'user-2',
    messages: [
      { id: 'msg-1', senderId: 'user-2', text: 'Hey Sarah, saw your post on the new product launch. Congrats!', timestamp: '2 hours ago', read: false },
      { id: 'msg-2', senderId: 'user-1', text: 'Thanks, David! It was a team effort. How are things on the engineering side?', timestamp: '1 hour ago', read: true },
    ]
  },
  {
    userId: 'user-3',
    messages: [
      { id: 'msg-3', senderId: 'user-3', text: 'Hi Sarah, I have some new mockups for the dashboard redesign. Would love your feedback.', timestamp: 'Yesterday', read: true },
    ]
  }
];
