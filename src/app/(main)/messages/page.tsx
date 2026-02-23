'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Search, MessageSquare, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const users = [
    { id: 'alex_g', name: 'Alex_G', avatar: 'https://picsum.photos/seed/opponent/150/150', lastMessage: 'See you there!', time: '10:42 AM', unread: 2 },
    { id: 'charlie_ux', name: 'Charlie', avatar: 'https://picsum.photos/seed/charlie/150/150', lastMessage: 'Sounds good!', time: '9:30 AM', unread: 0 },
    { id: 'bob_codes', name: 'Bob', avatar: 'https://picsum.photos/seed/bob/150/150', lastMessage: 'Haha, true!', time: 'Yesterday', unread: 0 },
    { id: 'alice_dev', name: 'Alice', avatar: 'https://picsum.photos/seed/alice/150/150', lastMessage: 'Got it, thanks!', time: 'Yesterday', unread: 0 },
];

const messagesData = {
    alex_g: [
        { id: 1, sender: 'alex_g', text: 'Hey, ready for the rematch?' },
        { id: 2, sender: 'me', text: 'You know it! Bringing my A-game this time.' },
        { id: 3, sender: 'alex_g', text: 'We\'ll see about that. I\'ve been practicing.' },
        { id: 4, sender: 'alex_g', text: 'Same time tomorrow?' },
        { id: 5, sender: 'me', text: 'Perfect. See you there!' },
    ],
    charlie_ux: [
        { id: 1, sender: 'charlie_ux', text: 'Can you review the latest design?' },
        { id: 2, sender: 'me', text: 'On it. Will send feedback shortly.' },
        { id: 3, sender: 'charlie_ux', text: 'Sounds good!' },
    ],
    bob_codes: [
        { id: 1, sender: 'bob_codes', text: 'Found a weird bug on the results page.' },
        { id: 2, sender: 'me', text: 'Oh? What\'s happening?' },
    ],
    alice_dev: [
        { id: 1, sender: 'alice_dev', text: 'Hey, I pushed the latest changes for the feed.' },
        { id: 2, sender: 'me', text: 'Great, I\'ll pull and check it out.' },
    ]
};

type User = typeof users[0];

export default function MessagesPage() {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [messages, setMessages] = useState(messagesData);
    const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState('');

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const currentMessages = selectedUser ? messages[selectedUser.id as keyof typeof messages] || [] : [];

    const handleDeleteMessage = (messageId: number) => {
        if (!selectedUser) return;

        const userId = selectedUser.id as keyof typeof messages;
        setMessages(prev => ({
            ...prev,
            [userId]: prev[userId].filter(m => m.id !== messageId)
        }));
        setSelectedMessageId(null);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim() || !selectedUser) return;

        const userId = selectedUser.id as keyof typeof messages;
        const newMessage = {
            id: Date.now(),
            sender: 'me',
            text: inputValue.trim()
        };

        setMessages(prev => ({
            ...prev,
            [userId]: [...(prev[userId] || []), newMessage]
        }));
        setInputValue('');
    };


    return (
        <div className="h-[calc(100vh-5rem)] flex bg-background text-foreground">
            {/* Sidebar */}
            <div className={cn(
                "w-full md:w-1/3 lg:w-1/4 border-r border-border flex-col",
                selectedUser ? "hidden md:flex" : "flex"
            )}>
                <div className="p-4 border-b border-border">
                    <h1 className="text-2xl font-headline tracking-tight uppercase italic">Requests</h1>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search messages..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.map((user) => (
                        <button
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            className={cn(
                                "w-full text-left p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors",
                                selectedUser?.id === user.id && "bg-muted"
                            )}
                        >
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 truncate">
                                <div className="flex justify-between items-center">
                                    <p className="font-bold">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.time}</p>
                                </div>
                                <div className="flex justify-between items-start">
                                    <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                                    {user.unread > 0 && (
                                        <span className="flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 ml-2">
                                            {user.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={cn(
                "flex-1 flex-col",
                selectedUser ? "flex" : "hidden md:flex"
            )}>
                {selectedUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="flex items-center gap-4 p-4 border-b border-border">
                            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedUser(null)}>
                                <ArrowLeft />
                            </Button>
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                                <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold text-lg">{selectedUser.name}</p>
                                <p className="text-sm text-muted-foreground">@{selectedUser.id}</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6" onClick={() => setSelectedMessageId(null)}>
                            {currentMessages.map((message, index) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3 items-end group",
                                        message.sender === 'me' ? 'flex-row-reverse' : 'flex-row'
                                    )}
                                >
                                    {message.sender !== 'me' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={selectedUser.avatar} />
                                            <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className="relative">
                                        <div
                                            onDoubleClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedMessageId(message.id);
                                            }}
                                            className={cn(
                                                "max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl text-sm transition-all duration-200 cursor-pointer select-none",
                                                message.sender === 'me'
                                                    ? 'bg-primary text-primary-foreground rounded-br-none'
                                                    : 'bg-muted rounded-bl-none',
                                                selectedMessageId === message.id && 'ring-2 ring-primary ring-offset-2 opacity-90'
                                            )}
                                        >
                                            {message.text}
                                        </div>

                                        {selectedMessageId === message.id && (
                                            <div className={cn(
                                                "absolute -top-12 flex bg-popover border border-border rounded-lg shadow-xl p-1 z-10 animate-in fade-in zoom-in duration-200",
                                                message.sender === 'me' ? 'right-0' : 'left-0'
                                            )}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs h-8 px-3"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteMessage(message.id);
                                                    }}
                                                >
                                                    Delete {message.sender === 'me' ? 'for everyone' : 'for me'}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-border bg-background">
                            <form
                                className="relative"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSendMessage();
                                }}
                            >
                                <Input
                                    placeholder="Type a message..."
                                    className="pr-12 h-12 text-base"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex-col items-center justify-center text-center hidden md:flex">
                        <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
                        <h2 className="text-4xl font-headline tracking-tight uppercase italic">Select a conversation</h2>
                        <p className="text-muted-foreground mt-2">Choose from your existing conversations to start chatting.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
