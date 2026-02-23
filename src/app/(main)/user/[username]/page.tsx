'use client';

import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Share2,
    Plus,
    Swords,
    Trophy,
    TrendingUp,
    Shield,
    Star,
    Zap,
    BrainCircuit,
    Bot,
    ArrowLeft
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/types';

// Mock data for user profiles
const userProfiles: { [key: string]: User } = {
    'alice_dev': {
        id: 'user-2',
        name: 'Alice',
        username: '@alice_dev',
        avatarUrl: 'https://picsum.photos/seed/alice/150/150',
        bannerUrl: 'https://picsum.photos/seed/banner2/1200/300',
        role: 'Full Stack Developer',
        skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
        goals: 'Passionate about building scalable applications and learning new technologies.',
        experience: '5+ years in web development.',
        online: true,
        following: 142,
        followers: 850,
        rank: { name: 'Pro', tier: 'I', progress: 45, rating: 2100 },
        competitiveRecord: { wins: 52, ties: 5, losses: 18 },
        ratings: [
            { category: 'Aptitude', rating: 92 },
            { category: 'Logical Reasoning', rating: 88 },
            { category: 'Memory', rating: 85 },
            { category: 'Problem Solving', rating: 95 },
        ],
        stats: { maxStreak: 15, totalXp: 45000, leagueName: 'Master', totalGames: 75 },
        recentMatches: [
            { id: 'm1', opponent: { id: 'u1', name: 'Sarah Chen', avatarUrl: 'https://picsum.photos/seed/user1/100/100' }, score: '5-2', result: 'win', type: 'Logic Duel' },
            { id: 'm2', opponent: { id: 'u3', name: 'David Lee', avatarUrl: 'https://picsum.photos/seed/user2/100/100' }, score: '4-4', result: 'tie', type: 'Aptitude' },
        ]
    },
    'bob_codes': {
        id: 'user-3',
        name: 'Bob',
        username: '@bob_codes',
        avatarUrl: 'https://picsum.photos/seed/bob/150/150',
        bannerUrl: 'https://picsum.photos/seed/banner3/1200/300',
        role: 'Frontend Engineer',
        skills: ['Vue', 'CSS', 'Design', 'TypeScript'],
        goals: 'Creating beautiful user interfaces and smooth experiences.',
        experience: '4 years of frontend dev.',
        online: true,
        following: 89,
        followers: 320,
        rank: { name: 'Gold', tier: 'III', progress: 80, rating: 1650 },
        competitiveRecord: { wins: 41, ties: 2, losses: 25 },
        ratings: [
            { category: 'Aptitude', rating: 78 },
            { category: 'Logical Reasoning', rating: 82 },
            { category: 'Memory', rating: 90 },
            { category: 'Problem Solving', rating: 80 },
        ],
        stats: { maxStreak: 8, totalXp: 28000, leagueName: 'Diamond', totalGames: 68 },
        recentMatches: [
            { id: 'm3', opponent: { id: 'u1', name: 'Sarah Chen', avatarUrl: 'https://picsum.photos/seed/user1/100/100' }, score: '3-5', result: 'loss', type: 'Problem Solving' },
        ]
    }
};

// Dummy data for the chart
const performanceData = [
    { week: 'W1', xp: 200 },
    { week: 'W2', xp: 450 },
    { week: 'W3', xp: 300 },
    { week: 'W4', xp: 600 },
    { week: 'W5', xp: 550 },
    { week: 'W6', xp: 750 },
    { week: 'W7', xp: 850 },
];

export default function UserProfilePage() {
    const params = useParams();
    const router = useRouter();
    const username = (params.username as string).replace('@', ''); // Handle @ in username
    const user = userProfiles[username] as Required<User>;

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-6 text-center h-[80vh] flex flex-col items-center justify-center">
                <h1 className="text-4xl font-headline text-foreground">User not found</h1>
                <p className="text-muted-foreground mt-2">Could not find a profile for @{username}</p>
                <Button onClick={() => router.back()} className="mt-6">
                    <ArrowLeft className="mr-2" /> Go Back
                </Button>
            </div>
        );
    }

    const ratingIcons: { [key: string]: React.ElementType } = {
        'Aptitude': BrainCircuit,
        'Logical Reasoning': Bot,
        'Memory': Zap,
        'Problem Solving': Star,
    };

    const stats = [
        { icon: TrendingUp, value: user.stats.maxStreak, label: 'Max Streak' },
        { icon: Star, value: user.stats.totalXp.toLocaleString(), label: 'Total XP' },
        { icon: Shield, value: user.stats.leagueName, label: 'League' },
        { icon: Swords, value: user.stats.totalGames, label: 'Games Played' },
    ];

    return (
        <TooltipProvider>
            <div className="space-y-8 pb-24">
                {/* Back Button */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()} className="shadow-sm">
                        <ArrowLeft />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h2 className="text-xl font-bold">Profile</h2>
                </div>

                {/* Profile Header */}
                <Card className="overflow-hidden shadow-md">
                    <div className="relative">
                        <Image
                            src={user.bannerUrl || 'https://picsum.photos/seed/default/1200/300'}
                            alt="Banner"
                            width={1200}
                            height={300}
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    </div>
                    <div className="p-6 pt-0 relative -mt-16 flex flex-col items-center text-center">
                        <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-primary shadow-lg">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h1 className="text-4xl font-headline tracking-tight uppercase italic mt-4">{user.name}</h1>
                        <p className="text-muted-foreground">@{username}</p>

                        <Badge variant="secondary" className="mt-2 text-sm">
                            {user.rank.name} {user.rank.tier}
                        </Badge>

                        <div className="flex gap-8 mt-4 text-sm">
                            <div className="flex flex-col">
                                <span className="font-headline text-2xl tracking-tight">{user.following}</span>
                                <span className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest leading-none">Following</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-headline text-2xl tracking-tight">{user.followers}</span>
                                <span className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest leading-none">Followers</span>
                            </div>
                        </div>

                        <p className="mt-4 max-w-md mx-auto text-muted-foreground text-sm">{user.goals}</p>

                        <div className="flex gap-2 mt-6">
                            <Button className="shadow-md">
                                <Swords className="mr-2 h-4 w-4" /> Challenge
                            </Button>
                            <Button variant="secondary" className="shadow-md">
                                <Plus className="mr-2 h-4 w-4" /> Connect
                            </Button>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" className="shadow-md">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Share Profile</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </Card>

                {/* Ratings / Skill Cards */}
                <div>
                    <h2 className="text-2xl font-headline tracking-tight uppercase italic mb-4 px-2">Ratings</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {user.ratings.map(rating => {
                            const Icon = ratingIcons[rating.category] || Star;
                            return (
                                <Card key={rating.category} className="p-4 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 hover:shadow-lg shadow-md">
                                    <Icon className="h-8 w-8 text-primary mb-2" />
                                    <p className="text-4xl font-headline tracking-tight">{rating.rating}</p>
                                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{rating.category}</p>
                                </Card>
                            )
                        })}
                    </div>
                </div>

                {/* Rank and Stats Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Rank Section */}
                    <Card className="lg:col-span-1 flex flex-col items-center justify-center p-6 text-center shadow-md">
                        <Trophy className="h-16 w-16 text-amber-400 drop-shadow-lg" />
                        <h2 className="text-3xl font-headline tracking-tight uppercase italic mt-4">{user.rank.name} {user.rank.tier}</h2>
                        <p className="text-muted-foreground font-bold uppercase text-xs tracking-widest">{user.rank.rating} Rating</p>
                        <div className="w-full mt-4">
                            <Progress value={user.rank.progress} className="h-3" />
                            <p className="text-xs text-muted-foreground mt-1 text-right">{user.rank.progress}% to next tier</p>
                        </div>
                    </Card>

                    {/* Stats Overview */}
                    <Card className="lg:col-span-2 shadow-md">
                        <CardHeader>
                            <CardTitle className="font-headline tracking-tight uppercase italic text-2xl">Stats Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map(stat => (
                                <div key={stat.label} className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50">
                                    <stat.icon className="h-6 w-6 text-muted-foreground mb-2" />
                                    <p className="text-2xl font-headline tracking-tight">{stat.value}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Performance Graph */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="font-headline tracking-tight uppercase italic text-2xl">Weekly Performance</CardTitle>
                        <CardDescription>Performance trends over the last 7 weeks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 -ml-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                                    <RechartsTooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--background))',
                                            borderColor: 'hsl(var(--border))',
                                            borderRadius: 'var(--radius)'
                                        }}
                                    />
                                    <Line type="monotone" dataKey="xp" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="font-headline tracking-tight uppercase italic text-2xl">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {user.recentMatches.map(match => (
                                <div key={match.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                                    <Avatar>
                                        <AvatarImage src={match.opponent.avatarUrl} alt={match.opponent.name} />
                                        <AvatarFallback>{match.opponent.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="font-semibold">{match.opponent.name}</p>
                                        <p className="text-sm text-muted-foreground">{match.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn(
                                            "font-headline tracking-tight text-xl leading-none",
                                            match.result === 'win' && 'text-success',
                                            match.result === 'loss' && 'text-destructive',
                                        )}>{match.result.toUpperCase()}</p>
                                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mt-1">Score: {match.score}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TooltipProvider>
    );
}
