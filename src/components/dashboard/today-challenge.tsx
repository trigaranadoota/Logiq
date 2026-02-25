"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";

export function TodayChallenge() {
  const router = useRouter();

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

  const handleStartChallenge = (challenge: (typeof challenges)[0]) => {
    router.push(challenge.href);
  };

  return (
    <section>
      <h2 className="text-2xl font-headline text-foreground mb-4">TODAY'S CHALLENGES</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {challenges.map(
          (challenge) =>
            challenge.image && (
              <div
                key={challenge.id}
                onClick={() => handleStartChallenge(challenge)}
                className="block group cursor-pointer"
              >
                <Card className="overflow-hidden relative bg-white border-2 border-primary/20 shadow-sm rounded-2xl transition-all duration-300 hover:shadow-md">
                  <div className="relative h-48 w-full bg-white">
                    <Image
                      src={`${challenge.image.imageUrl}?v=4`}
                      alt={challenge.image.description}
                      fill
                      className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
                      priority={challenge.id === 'logic-puzzle'}
                    />
                    <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
                    <CardTitle className="text-3xl font-headline text-black drop-shadow-sm leading-tight">
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
