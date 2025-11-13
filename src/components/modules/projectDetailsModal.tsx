import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { X } from "lucide-react";
import type { Project } from "@/data/mockData.ts";
import defaultProjectImage from "@/assets/nova_logo.svg";
import { Badge } from "@/components/ui/badge";

interface ProjectDetailsModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card 
        // 1. O card principal é um flex-col para empilhar header/content/footer
        className="w-full max-w-2xl shadow-2xl max-h-[90svh] p-0 flex flex-col" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER: Fixo no topo, garante que o título e o X fiquem visíveis */}
        <CardHeader className="flex flex-row items-center justify-between p-6 z-10 border-b">
          <CardTitle>{project.title}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        {/* SCROLLABLE CONTENT: Ocupa o espaço restante e rola o conteúdo */}
        <div className="flex-1 overflow-y-auto">
          <CardContent className="space-y-4 p-6 pt-4">
            <img
              src={project.imageUrl || defaultProjectImage}
              alt={project.title}
              className="h-64 w-full object-cover rounded-md"
            />
            
            <div
              className="text-base text-foreground/90 leading-relaxed project-content"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </CardContent>
        </div>

        {/* FOOTER: Fixo na base, separado do scroll */}
        <CardFooter className="flex flex-wrap gap-2 p-6 border-t">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </CardFooter>
      </Card>
    </div>
  );
}