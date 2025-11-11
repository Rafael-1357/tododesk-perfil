import { useState } from "react";
import { Edit2, X, Check, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import defaultAvatar from "@/assets/default-avatar.png";
import { Badge } from "@/components/ui/badge";
import { AddBadgeModal } from "./addBadgeModal";
import { useGeneralStore } from "@/store/general";

interface ProfileHeaderProps {
  userId: string;
  name: string;
  role: string;
  description: string;
  avatarUrl?: string;
  badge?: { sigla: string; nome: string; };
  onUpdate: (data: { name: string; description: string; avatarUrl?: string }) => void;
  isEditable?: boolean;
  isAdminView?: boolean;
}

export const ProfileHeader = ({ 
  userId, 
  name, 
  role, 
  description, 
  avatarUrl, 
  badge, 
  onUpdate, 
  isEditable = false, 
  isAdminView = false 
}: ProfileHeaderProps) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState(description);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const { updateUserBadge } = useGeneralStore();

  const handleSave = () => {
    onUpdate({
      name: name,
      description: editDescription,
      avatarUrl: avatarUrl,
    });
    setIsEditing(false);
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleCancel = () => {
    setEditDescription(description);
    setIsEditing(false);
  };

  const handleSaveBadge = (newBadge: { sigla: string; nome: string; }) => {
    updateUserBadge(userId, newBadge);
    toast.success("Badge atualizado!");
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <div className="relative bg-white rounded-xl from-card to-card/50 p-8 shadow-lg backdrop-blur-sm border border-border/50">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-lg">
              <AvatarImage src={avatarUrl || defaultAvatar} alt={name} />
              <AvatarFallback className="text-3xl bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-3">
            {isEditing ? (
              <>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-foreground">{name}</h1>
                    {badge && (
                      <Badge variant="default" className="text-lg px-2.5 py-0.5">
                        {badge.sigla}
                      </Badge>
                    )}
                    {isAdminView && (
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsBadgeModalOpen(true)}>
                        <PlusCircle className="h-4 w-4 text-primary" />
                      </Button>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">
                    {role} {badge && `• ${badge.nome}`}
                  </p>
                </div>
                <Textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="resize-none border-2 focus-visible:ring-primary"
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </>
            ) : (
              <>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-foreground">{name}</h1>
                    {badge && (
                      <Badge variant="default" className="text-lg px-2.5 py-0.5">
                        {badge.sigla}
                      </Badge>
                    )}
                    {isAdminView && (
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsBadgeModalOpen(true)}>
                        <PlusCircle className="h-4 w-4 text-primary" />
                      </Button>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mt-1">
                    {role} {badge && `• ${badge.nome}`}
                  </p>
                </div>
                <p className="text-foreground/80 leading-relaxed w-11/12">{description}</p>
              </>
            )}
          </div>

          {isEditable && (
            <div className="flex gap-2">
              {isEditing ? (
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="shadow-elevated hover:shadow-glow transition-all"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                  <Button onClick={handleCancel} size="sm" variant="outline">
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  size="sm"
                  variant="outline"
                  className="bg-[#260717] text-white"
                >
                  <Edit2 className="h-4 w-4 mr-2]" />
                  Editar Perfil
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {isBadgeModalOpen && (
        <AddBadgeModal
          onClose={() => setIsBadgeModalOpen(false)}
          onSave={handleSaveBadge}
        />
      )}
    </>
  );
};