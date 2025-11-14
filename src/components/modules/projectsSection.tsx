import { useState } from "react";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import type { Project } from "@/data/mockData.ts";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useGeneralStore } from "@/store/general";
import { AddProjectModal } from "./addProjectModal";
import { Badge } from "@/components/ui/badge";
import defaultProjectImage from "@/assets/nova_logo.svg";
import { ProjectDetailsModal } from "./projectDetailsModal";

interface ProjectCardProps {
  project: Project;
  isEditable: boolean;
  onRemove: () => void;
  onClick: () => void;
  isCoCreator: boolean;
}

const ProjectCard = ({ project, isEditable, onRemove, onClick, isCoCreator }: ProjectCardProps) => {
  const plainDescription = project.description.replace(/<[^>]+>/g, '');

  return (
    <div className="relative group">
      {isEditable && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full z-10"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="h-4 w-4 text-white" />
        </Button>
      )}

      <Card
        className="bg-card/50 py-0 max-h-80 gap-0 cursor-pointer text-left"
      >
        <button onClick={onClick}>
          <img
            src={project.imageUrl || defaultProjectImage}
            alt={project.title}
            className="h-40 w-full object-cover"
          />

          <div className="p-6 space-y-4">
            <div className="space-y-2 min-h-[80px]">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{project.title}</span>
                {isCoCreator && (
                  <Badge variant="secondary" className="font-medium text-xs">Cocriador</Badge>
                )}
              </CardTitle>
              <CardContent className="p-0 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {plainDescription}
              </CardContent>
            </div>
            <CardFooter className="p-0 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </CardFooter>
          </div>
        </button>
      </Card>
    </div>
  );
};

interface ProjectsSectionProps {
  userId: string;
  isEditable?: boolean;
}

export const ProjectsSection = ({ userId, isEditable = false }: ProjectsSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { addProject, removeProject } = useGeneralStore();
  const allProjects = useGeneralStore((state) => state.projects);

  const userProjects = allProjects.filter(
    (project) => 
      project.ownerId === userId || 
      project.coCreatorIds.includes(userId)
  );

  const handleSaveProject = (newProjectData: Omit<Project, 'id'>) => {
    addProject(newProjectData);
  };

  const handleRemoveProject = (projectId: string) => {
    removeProject(projectId);
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

        {userProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isEditable={project.ownerId === userId && isEditable}
                onRemove={() => handleRemoveProject(project.id)}
                onClick={() => setSelectedProject(project)}
                isCoCreator={project.ownerId !== userId}
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
          ownerId={userId}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProject}
        />
      )}

      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};