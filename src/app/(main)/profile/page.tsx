'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import { useProfile } from '@/hooks/use-profile';
import type { User } from '@/lib/types';
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
    FilePenLine,
    UserPlus,
    UserCheck
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserList, type UserListItem } from "@/components/profile/user-list";

// Mock data for followers/following
const MOCK_FOLLOWERS: UserListItem[] = [
    { id: 'f1', name: 'Alice Chen', username: '@alice_dev', avatarUrl: 'https://picsum.photos/seed/alice/100/100', isFollowing: true },
    { id: 'f2', name: 'Bob Smith', username: '@bob_codes', avatarUrl: 'https://picsum.photos/seed/bob/100/100', isFollowing: false },
    { id: 'f3', name: 'Charlie Day', username: '@charlie_run', avatarUrl: 'https://picsum.photos/seed/charlie/100/100', isFollowing: true },
];

const MOCK_FOLLOWING: UserListItem[] = [
    { id: 'f1', name: 'Alice Chen', username: '@alice_dev', avatarUrl: 'https://picsum.photos/seed/alice/100/100', isFollowing: true },
    { id: 'f3', name: 'Charlie Day', username: '@charlie_run', avatarUrl: 'https://picsum.photos/seed/charlie/100/100', isFollowing: true },
    { id: 'f4', name: 'David Lee', username: '@dlee', avatarUrl: 'https://picsum.photos/seed/david/100/100', isFollowing: true },
];

// Dummy data for the chart
const performanceData = [
    { week: 'W1', xp: 400 },
    { week: 'W2', xp: 300 },
    { week: 'W3', xp: 500 },
    { week: 'W4', xp: 700 },
    { week: 'W5', xp: 600 },
    { week: 'W6', xp: 800 },
    { week: 'W7', xp: 900 },
];

export default function ProfilePage() {
    const { user: rawUser, loading } = useProfile();
    const user = rawUser as Required<User>;
    const [isFollowing, setIsFollowing] = React.useState(false);

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;
    }

    if (!rawUser) {
        return <div className="min-h-screen flex items-center justify-center">Please log in to view your profile.</div>;
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
                {/* Profile Header */}
                <Card className="overflow-hidden shadow-md">
                    <div className="relative">
                        <Image
                            src={user.bannerUrl}
                            alt="Banner"
                            width={1200}
                            height={300}
                            className="w-full h-48 object-cover"
                            data-ai-hint="abstract background"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    </div>
                    <div className="p-6 pt-0 relative -mt-16 flex flex-col items-center text-center">
                        <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-primary shadow-lg">
                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h1 className="text-4xl font-headline tracking-tight uppercase italic mt-4">{user.name}</h1>
                        <p className="text-muted-foreground">{user.username}</p>

                        <Badge variant="secondary" className="mt-2 text-sm">
                            {user.rank.name} {user.rank.tier}
                        </Badge>

                        <div className="flex gap-8 mt-4 text-sm">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
                                        <span className="font-headline text-2xl tracking-tight">{user.following}</span>
                                        <span className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest leading-none">Following</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="font-headline uppercase italic">Following</DialogTitle>
                                    </DialogHeader>
                                    <UserList users={MOCK_FOLLOWING} />
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
                                        <span className="font-headline text-2xl tracking-tight">{user.followers}</span>
                                        <span className="text-muted-foreground uppercase text-[10px] font-bold tracking-widest leading-none">Followers</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="font-headline uppercase italic">Followers</DialogTitle>
                                    </DialogHeader>
                                    <UserList users={MOCK_FOLLOWERS} />
                                </DialogContent>
                            </Dialog>
                        </div>

                        <p className="mt-4 max-w-md mx-auto text-muted-foreground text-sm">{user.goals}</p>

                        <div className="flex gap-2 mt-6">
                            <Button className="shadow-md">
                                <Swords className="mr-2 h-4 w-4" /> Challenge
                            </Button>
                            <Button
                                variant={isFollowing ? "secondary" : "default"}
                                className="shadow-md min-w-[100px]"
                                onClick={handleFollow}
                            >
                                {isFollowing ? (
                                    <>
                                        <UserCheck className="mr-2 h-4 w-4" /> Following
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="mr-2 h-4 w-4" /> Follow
                                    </>
                                )}
                            </Button>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" className="shadow-md" asChild>
                                        <Link href="/profile/edit">
                                            <FilePenLine className="h-4 w-4" />
                                            <span className="sr-only">Edit Profile</span>
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Edit Profile</p>
                                </TooltipContent>
                            </Tooltip>
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
                        {user.ratings.map((rating: { category: string; rating: number }) => {
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
                        <CardDescription>Your XP gain over the last 7 weeks.</CardDescription>
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

                {/* Recent Matches */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="font-headline tracking-tight uppercase italic text-2xl">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {user.recentMatches.map((match: any) => (
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
