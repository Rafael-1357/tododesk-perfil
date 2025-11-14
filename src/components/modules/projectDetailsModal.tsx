import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { X } from "lucide-react";
import type { Project } from "@/data/mockData.ts";
import defaultProjectImage from "@/assets/nova_logo.svg";
import defaultAvatar from "@/assets/default-avatar.png";
import { Badge } from "@/components/ui/badge";
import { useGeneralStore } from "@/store/general";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

interface TeamMemberProps {
  name: string;
  role: string;
  avatarUrl?: string;
  isOwner?: boolean;
}

const TeamMember = ({ name, role, avatarUrl, isOwner = false }: TeamMemberProps) => {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarUrl || defaultAvatar} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-sm">
          {name} 
          {isOwner && <span className="text-xs text-muted-foreground ml-1">(Dono)</span>}
        </p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  const allUsers = useGeneralStore((state) => state.users);
  
  const owner = allUsers.find(u => u.id === project.ownerId);
  const coCreators = allUsers.filter(u => project.coCreatorIds.includes(u.id));

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card 
        className="w-full max-w-2xl shadow-2xl max-h-[90svh] p-0 flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="flex flex-row items-center justify-between p-6 z-10 border-b">
          <CardTitle>{project.title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <div className="flex-1 overflow-y-auto min-h-0">
          <CardContent className="space-y-4 p-6 pt-4">
            <img
              src={project.imageUrl || defaultProjectImage}
              alt={project.title}
              className="h-64 w-full object-cover rounded-md"
            />
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Equipe</h3>
              <div className="space-y-3">
                {owner && (
                  <TeamMember 
                    name={owner.name}
                    role={owner.role}
                    avatarUrl={owner.avatarUrl}
                    isOwner
                  />
                )}
                {coCreators.map(user => (
                  <TeamMember 
                    key={user.id}
                    name={user.name}
                    role={user.role}
                    avatarUrl={user.avatarUrl}
                  />
                ))}
              </div>
            </div>

            <div className="border-t pt-4 mt-4 space-y-3">
               <h3 className="text-lg font-semibold text-foreground">Descrição</h3>
              <div
                className="text-base text-foreground/90 leading-relaxed project-content break-words"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>

          </CardContent>
        </div>

        <CardFooter className="flex flex-col items-start gap-3 p-6 border-t">
          <h3 className="text-lg font-semibold text-foreground">Tecnologias</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}