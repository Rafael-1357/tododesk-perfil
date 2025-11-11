import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface AddBadgeModalProps {
  onClose: () => void;
  onSave: (badge: { sigla: string; nome: string; }) => void;
}

export function AddBadgeModal({ onClose, onSave }: AddBadgeModalProps) {
  const [sigla, setSigla] = useState("");
  const [nome, setNome] = useState("");

  const handleSave = () => {
    if (!sigla || !nome) return;
    onSave({ sigla, nome });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Adicionar Badge</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="sigla" className="text-sm font-medium">Sigla (Ex: S+)</label>
            <Input
              id="sigla"
              value={sigla}
              onChange={(e) => setSigla(e.target.value)}
              placeholder="S+"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="nome" className="text-sm font-medium">Nome (Ex: Sniper)</label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Sniper"
            />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Badge</Button>
        </CardFooter>
      </Card>
    </div>
  );
}