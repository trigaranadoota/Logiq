"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export type UserListItem = {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
    isFollowing: boolean;
};

interface UserListProps {
    users: UserListItem[];
    onToggleFollow?: (userId: string) => void;
}

export function UserList({ users, onToggleFollow }: UserListProps) {
    return (
        <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between group">
                        <Link href={`/user/${user.username.replace('@', '')}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                            <Avatar className="h-10 w-10 border border-border">
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-semibold text-sm leading-none group-hover:text-primary transition-colors">
                                    {user.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {user.username}
                                </span>
                            </div>
                        </Link>
                        <Button
                            variant={user.isFollowing ? "secondary" : "default"}
                            size="sm"
                            className="h-8 font-bold text-xs uppercase tracking-wider"
                            onClick={() => onToggleFollow?.(user.id)}
                        >
                            {user.isFollowing ? "Following" : "Follow"}
                        </Button>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
