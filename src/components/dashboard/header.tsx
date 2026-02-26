import { Flame } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export function DashboardHeader() {
    return (
        <header className="flex justify-between items-center">
            <Link href="/arena" className="hover:opacity-80 transition-opacity">
                <h1 className="text-4xl font-headline text-foreground italic uppercase italic tracking-tighter">Logiq</h1>
            </Link>
            <div className="flex items-center space-x-2 p-1 rounded-full bg-card border">
                <div className="flex items-center space-x-2 p-1 pr-2">
                    <div className="w-7 h-7 rounded-full bg-destructive/20 flex items-center justify-center">
                        <Flame className="w-4 h-4 text-destructive" />
                    </div>
                    <span className="font-bold text-sm text-foreground">12</span>
                </div>
                <Separator orientation="vertical" className="h-5" />
                <div className="flex items-center space-x-2 p-1 pr-2">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-bold text-xs text-primary">XP</span>
                    </div>
                    <span className="font-bold text-sm text-foreground">5,430</span>
                </div>
                <Separator orientation="vertical" className="h-5" />
                <Link href="/saved-questions" className="flex items-center space-x-2 p-1 pr-2 hover:bg-accent rounded-full transition-colors group">
                    <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                        <span className="font-bold text-xs text-secondary-foreground">★</span>
                    </div>
                    <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">Saved</span>
                </Link>
            </div>
        </header>
    );
}
