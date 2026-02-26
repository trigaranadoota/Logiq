"use client";

import React from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Bookmark, ArrowRight } from "lucide-react";
import Link from "next/link";

const MOCK_SAVED_QUESTIONS = [
    {
        id: 1,
        title: "The Missing Link",
        category: "Logic Puzzle",
        difficulty: "Medium",
        savedAt: "2 hours ago",
    },
    {
        id: 2,
        title: "Prime Sequence",
        category: "Number Series",
        difficulty: "Hard",
        savedAt: "Yesterday",
    },
    {
        id: 3,
        title: "Relative Speed Paradox",
        category: "Speed & Time",
        difficulty: "Medium",
        savedAt: "3 days ago",
    },
];

export default function SavedQuestionsPage() {
    return (
        <div className="container mx-auto px-4 py-6 space-y-8">
            <DashboardHeader />

            <div className="flex items-center space-x-4">
                <Link href="/arena">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ChevronLeft className="w-6 h-6" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-headline text-foreground italic uppercase tracking-tighter">
                    Saved Questions
                </h1>
            </div>

            <div className="grid gap-4">
                {MOCK_SAVED_QUESTIONS.length > 0 ? (
                    MOCK_SAVED_QUESTIONS.map((question) => (
                        <Card key={question.id} className="group hover:border-primary/50 transition-colors border-2 bg-card/50 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl font-headline group-hover:text-primary transition-colors">
                                        {question.title}
                                    </CardTitle>
                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground uppercase tracking-widest font-bold">
                                        <span>{question.category}</span>
                                        <span>•</span>
                                        <span className={
                                            question.difficulty === 'Hard' ? 'text-destructive' : 'text-primary'
                                        }>
                                            {question.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <Bookmark className="w-5 h-5 text-primary fill-primary" />
                            </CardHeader>
                            <CardContent className="flex items-center justify-between pt-4">
                                <p className="text-xs text-muted-foreground italic">
                                    Saved {question.savedAt}
                                </p>
                                <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    Solve Now <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <Bookmark className="w-12 h-12 text-muted-foreground/20" />
                        <p className="text-muted-foreground font-medium">No saved questions yet.</p>
                        <Link href="/arena">
                            <Button variant="link">Go back to Arena</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
