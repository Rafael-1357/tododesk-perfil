import { useState } from "react";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import type { Project } from "@/data/mockData.ts";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useGeneralStore } from "@/store/general";
import { AddProjectModal } from "./addProjectModal";
import { Badge } from "@/components/ui/badge";
import defaultProjectImage from "@/assets/nova_logo.svg";

interface ProjectCardProps {
  project: Project;
  isEditable: boolean;
  onRemove: () => void;
}

const ProjectCard = ({ project, isEditable, onRemove }: ProjectCardProps) => (
  <div className="relative group">
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
    
    <Card className="bg-card/50 py-0 max-h-80 gap-0">
      <img
        src={project.imageUrl || defaultProjectImage}
        alt={project.title}
        className="h-40 w-full object-cover"
      />

      <div className="p-6 space-y-4">
        <div className="space-y-2 min-h-[80px]">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <CardContent className="p-0 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </CardContent>
        </div>
        <CardFooter className="p-0 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </CardFooter>
      </div>
    </Card>
  </div>
);

interface ProjectsSectionProps {
  userId: string;
  projects: Project[];
  isEditable?: boolean;
}

export const ProjectsSection = ({ userId, projects, isEditable = false }: ProjectsSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addProjectToUser, removeProjectFromUser } = useGeneralStore();

  const handleSaveProject = (newProject: Project) => {
    addProjectToUser(userId, newProject);
  };

  const handleRemoveProject = (index: number) => {
    removeProjectFromUser(userId, index);
  };

  return (
    <>
      <div className="space-y-4 pb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Projetos</h2>
          {isEditable && (
            <Button onClick={() => setIsModalOpen(true)} className="bg-[#480e2a]">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Projeto
            </Button>
          )}
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                isEditable={isEditable}
                onRemove={() => handleRemoveProject(index)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center p-4 rounded-md border border-dashed bg-card/50">
            <p className="text-sm text-muted-foreground">Nenhum projeto adicionado ainda.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddProjectModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProject}
        />
      )}
    </>
  );
};