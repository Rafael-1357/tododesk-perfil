import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Music, Book, Rocket, Heart, Cpu, Globe, Camera, Coffee, Gamepad2, Plane, Dumbbell, Film, ShoppingBag, Utensils } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface Interest {
  label: string;
  icon: React.ReactNode;
}

export const InterestsSection = () => {
  const allInterests: Interest[] = [
    { label: "Web Development", icon: <Code className="h-3 w-3" /> },
    { label: "UI/UX Design", icon: <Palette className="h-3 w-3" /> },
    { label: "Music Production", icon: <Music className="h-3 w-3" /> },
    { label: "Reading", icon: <Book className="h-3 w-3" /> },
    { label: "Space Exploration", icon: <Rocket className="h-3 w-3" /> },
    { label: "Health & Wellness", icon: <Heart className="h-3 w-3" /> },
    { label: "AI & Machine Learning", icon: <Cpu className="h-3 w-3" /> },
    { label: "Travel", icon: <Globe className="h-3 w-3" /> },
    { label: "Photography", icon: <Camera className="h-3 w-3" /> },
    { label: "Coffee", icon: <Coffee className="h-3 w-3" /> },
    { label: "Gaming", icon: <Gamepad2 className="h-3 w-3" /> },
    { label: "Aviation", icon: <Plane className="h-3 w-3" /> },
    { label: "Fitness", icon: <Dumbbell className="h-3 w-3" /> },
    { label: "Movies", icon: <Film className="h-3 w-3" /> },
    { label: "Fashion", icon: <ShoppingBag className="h-3 w-3" /> },
    { label: "Cooking", icon: <Utensils className="h-3 w-3" /> },
  ];

  const [interests, setInterests] = useState<Interest[]>([
    { label: "Web Development", icon: <Code className="h-3 w-3" /> },
    { label: "UI/UX Design", icon: <Palette className="h-3 w-3" /> },
    { label: "Music Production", icon: <Music className="h-3 w-3" /> },
    { label: "Reading", icon: <Book className="h-3 w-3" /> },
    { label: "Space Exploration", icon: <Rocket className="h-3 w-3" /> },
    { label: "Health & Wellness", icon: <Heart className="h-3 w-3" /> },
    { label: "AI & Machine Learning", icon: <Cpu className="h-3 w-3" /> },
    { label: "Travel", icon: <Globe className="h-3 w-3" /> },
  ]);

  const availableInterests = allInterests.filter(
    (interest) => !interests.some((selected) => selected.label === interest.label)
  );

  const handleAddInterest = (label: string) => {
    const interestToAdd = allInterests.find((interest) => interest.label === label);
    if (interestToAdd) {
      setInterests([...interests, interestToAdd]);
    }
  };

  const handleRemoveInterest = (indexToRemove: number) => {
    setInterests(interests.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4 rounded-xl bg-gradient-to-br from-card to-card/50 p-6 shadow-lg border border-border/50">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Áreas de Interesse</h2>
        {availableInterests.length > 0 && (
          <Select onValueChange={handleAddInterest}>
            <SelectTrigger className="w-[180px]">
              <Plus className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Adicionar interesse" />
            </SelectTrigger>
            <SelectContent>
              {availableInterests.map((interest) => (
                <SelectItem key={interest.label} value={interest.label}>
                  <div className="flex items-center gap-2">
                    {interest.icon}
                    {interest.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-elevated flex items-center gap-2 group"
          >
            {interest.icon}
            {interest.label}
            <button
              onClick={() => handleRemoveInterest(index)}
              className="bg ml-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 rounded-full p-0.5"
              aria-label={`Remove ${interest.label}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
