"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MatchmakingOverlay } from "./matchmaking-overlay";

const challenges = [
  {
    id: "logic-puzzle",
    title: "Logic Puzzle",
    image: PlaceHolderImages.find((img) => img.id === "logic-puzzle"),
    href: "/challenge/logic-puzzle",
  },
  {
    id: "aptitude-sprint",
    title: "Aptitude Sprint",
    image: PlaceHolderImages.find((img) => img.id === "aptitude-sprint"),
    href: "/challenge/aptitude-sprint",
  },
  {
    id: "number-series",
    title: "Number Series Duel",
    image: PlaceHolderImages.find((img) => img.id === "number-series"),
    href: "/challenge/number-series",
  },
  {
    id: "speed-time",
    title: "Speed & Time Trial",
    image: PlaceHolderImages.find((img) => img.id === "speed-time"),
    href: "/challenge/speed-time",
  },
];

export function TodayChallenge() {
  const router = useRouter();
  const [matchmaking, setMatchmaking] = useState<{
    gameId: string;
    title: string;
    href: string;
  } | null>(null);

  const handleStartChallenge = (challenge: (typeof challenges)[0]) => {
    setMatchmaking({
      gameId: challenge.id,
      title: challenge.title,
      href: challenge.href,
    });

    // Simulate matchmaking delay
    setTimeout(() => {
      router.push(challenge.href);
    }, 2500); // 2.5 seconds of high-fidelity pulsing
  };

  return (
    <section>
      <MatchmakingOverlay
        gameId={matchmaking?.gameId || ""}
        gameTitle={matchmaking?.title || ""}
        isVisible={!!matchmaking}
      />

      <h2 className="text-2xl font-headline text-foreground mb-4">Today's Challenges</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {challenges.map(
          (challenge) =>
            challenge.image && (
              <div
                key={challenge.id}
                onClick={() => handleStartChallenge(challenge)}
                className="block group cursor-pointer"
              >
                <Card className="overflow-hidden relative">
                  <div className="relative h-48 w-full">
                    <Image
                      src={challenge.image.imageUrl}
                      alt={challenge.image.description}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={challenge.image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <CardTitle className="text-3xl font-headline text-black">
                      {challenge.title}
                    </CardTitle>
                  </div>
                </Card>
              </div>
            )
        )}
      </div>
    </section>
  );
}

