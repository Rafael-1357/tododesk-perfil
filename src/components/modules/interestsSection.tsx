import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import type { Interest } from "@/data/mockData";
import { allInterestsList } from "@/data/mockData";

interface InterestsSectionProps {
  interests: Interest[];
  isEditable?: boolean;
}

export const InterestsSection = ({ 
  interests: initialInterests, 
  isEditable = false 
}: InterestsSectionProps) => {

  const [interests, setInterests] = useState<Interest[]>(initialInterests);

  const availableInterests = allInterestsList.filter(
    (interest) => !interests.some((selected) => selected.label === interest.label)
  );

  const handleAddInterest = (label: string) => {
    const interestToAdd = allInterestsList.find((interest) => interest.label === label);
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
        {isEditable && availableInterests.length > 0 && (
          <Select onValueChange={handleAddInterest}>
            <SelectTrigger className="w-[180px]">
              <Plus className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Adicionar interesse" />
            </SelectTrigger>
            <SelectContent>
              {availableInterests.map((interest) => {
                const Icon = interest.icon;
                return (
                  <SelectItem key={interest.label} value={interest.label}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-3 w-3" />
                      {interest.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => {
          const Icon = interest.icon;
          return (
            <Badge
              key={index}
              variant="secondary"
              className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-elevated flex items-center gap-2 group"
            >
              <Icon className="h-3 w-3" />
              {interest.label}
              {isEditable && (
                <button
                  onClick={() => handleRemoveInterest(index)}
                  className="bg ml-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 rounded-full p-0.5"
                  aria-label={`Remove ${interest.label}`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};