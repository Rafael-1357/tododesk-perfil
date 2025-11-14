import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Award, Trophy, Star, Medal, Target, Zap } from "lucide-react";
import type { Medal as MedalType } from "@/data/mockData.ts";
import { cn } from "@/lib/utils";

interface AddMedalModalProps {
  onClose: () => void;
  onSave: (medal: MedalType) => void;
}

const iconMap = {
  Award,
  Trophy,
  Star,
  Medal,
  Target,
  Zap,
};

type IconKey = keyof typeof iconMap;

const gradientPalette = [
  { name: "Cinza", classes: "from-gray-500 to-gray-600" },
  { name: "Vermelho", classes: "from-red-500 to-red-600" },
  { name: "Âmbar", classes: "from-amber-500 to-amber-600" },
  { name: "Amarelo", classes: "from-yellow-500 to-yellow-600" },
  { name: "Verde", classes: "from-green-500 to-green-600" },
  { name: "Azul", classes: "from-blue-500 to-blue-600" },
  { name: "Roxo", classes: "from-purple-500 to-purple-600" },
];

export function AddMedalModal({ onClose, onSave }: AddMedalModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("from-gray-500 to-gray-600");
  const [selectedIcon, setSelectedIcon] = useState<IconKey>("Award");

  const handleSave = () => {
    if (!title || !description) return;
    
    onSave({
      title,
      description,
      color,
      icon: iconMap[selectedIcon],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Adicionar Nova Medalha</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Título</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Mestre do Código"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Descrição</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Concluiu 100 tasks..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Cor</label>
            <div className="grid grid-cols-7 gap-2">
              {gradientPalette.map((palette) => (
                <button
                  key={palette.name}
                  type="button"
                  title={palette.name}
                  className={cn(
                    "h-8 w-8 rounded-full border bg-gradient-to-br transition-all",
                    palette.classes,
                    color === palette.classes 
                      ? "ring-2 ring-primary ring-offset-2" 
                      : "hover:scale-110"
                  )}
                  onClick={() => setColor(palette.classes)}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Ícone</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(iconMap) as IconKey[]).map((key) => {
                const Icon = iconMap[key];
                return (
                  <Button
                    key={key}
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedIcon(key)}
                    className={selectedIcon === key ? "ring-2 ring-primary" : ""}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Medalha</Button>
        </CardFooter>
      </Card>
    </div>
  );
}