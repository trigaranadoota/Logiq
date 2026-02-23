import { Flame } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function DashboardHeader() {
    return (
        <header className="flex justify-between items-center">
            <h1 className="text-4xl font-headline text-foreground italic uppercase italic tracking-tighter">Logiq</h1>
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
            </div>
        </header>
    );
}
