import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

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
    href: "/duel/1/results",
  },
  {
    id: "speed-time",
    title: "Speed & Time Trial",
    image: PlaceHolderImages.find((img) => img.id === "speed-time"),
    href: "/duel/2/results",
  },
];

export function TodayChallenge() {
  return (
    <section>
      <h2 className="text-2xl font-headline text-foreground mb-4">Today’s Challenges</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {challenges.map(
          (challenge) =>
            challenge.image && (
              <Card key={challenge.id} className="overflow-hidden group relative">
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
                  <CardTitle className="text-3xl font-headline text-white">
                    {challenge.title}
                  </CardTitle>
                  <div className="flex justify-end mt-2">
                    <Button asChild variant="default" className="rounded-full bg-white text-black hover:bg-gray-200">
                      <Link href={challenge.href || "#"}>
                        Start Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            )
        )}
      </div>
    </section>
  );
}
