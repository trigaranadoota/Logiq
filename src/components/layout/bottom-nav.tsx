"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Swords, Users, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/arena", label: "Arena", icon: Swords },
  { href: "/search", label: "Connect", icon: Users },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card/80 backdrop-blur-sm border-t border-border z-50">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          // Highlight main section even for sub-paths
          const isActive = pathname === item.href;
          
          return (
            <Link href={item.href} key={item.label} className="relative flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary transition-colors w-16">
              <item.icon className={cn("h-6 w-6", isActive && "text-primary")} />
              <span className={cn("text-xs font-medium", isActive && "text-primary")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
