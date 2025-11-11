import { useState } from "react";
import { Card } from "@/components/ui/card";
import type { Medal } from "@/data/mockData.ts";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { AddMedalModal } from "./addMedalModal";
import { useGeneralStore } from "@/store/general";

interface MedalProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  isEditable: boolean;
  onRemove: () => void;
}

const MedalCard = ({ icon: Icon, title, description, color, isEditable, onRemove }: MedalProps) => (
  <Card className="relative group gap-0 p-6 hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 bg-gradient-to-br from-card to-card/50">
    {isEditable && (
      <Button
        variant="destructive"
        size="icon"
        className="absolute -top-2 -right-2 h-6 w-6 rounded-full z-10"
        onClick={onRemove}
      >
        <X className="h-4 w-4 text-white" />
      </Button>
    )}
    <div className={`mb-4 w-12 p-3 rounded-xl shadow-elevated group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Card>
);

interface MedalsSectionProps {
  userId: string;
  medals: Medal[];
  isEditable?: boolean;
}

export const MedalsSection = ({ userId, medals, isEditable = false }: MedalsSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addMedalToUser, removeMedalFromUser } = useGeneralStore();

  const handleSaveMedal = (newMedal: Medal) => {
    addMedalToUser(userId, newMedal);
    console.log("New medal added to global state:", newMedal);
  };

  const handleRemoveMedal = (index: number) => {
    removeMedalFromUser(userId, index);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Medalhas</h2>
          {isEditable && (
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Medalha
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medals.map((medal, index) => (
            <MedalCard
              key={`${medal.title}-${index}`}
              {...medal}
              isEditable={isEditable}
              onRemove={() => handleRemoveMedal(index)}
            />
          ))}
        </div>
      </div>
      
      {isModalOpen && (
        <AddMedalModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveMedal}
        />
      )}
    </>
  );
};