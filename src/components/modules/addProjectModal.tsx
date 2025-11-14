import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Image as ImageIcon, Bold, Italic, List, ListOrdered } from "lucide-react";
import type { Project } from "@/data/mockData.ts";
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { toast } from "sonner";
import { useGeneralStore } from "@/store/general";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface AddProjectModalProps {
  onClose: () => void;
  onSave: (project: Omit<Project, 'id'>) => void;
  ownerId: string;
}

const RichTextEditorToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="flex items-center gap-1 rounded-md border border-input p-1 w-full flex-wrap">
      <Button
        type="button"
        size="icon-sm"
        variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon-sm"
        variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon-sm"
        variant={editor.isActive('bulletList') ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon-sm"
        variant={editor.isActive('orderedList') ? 'secondary' : 'ghost'}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};

export function AddProjectModal({ onClose, onSave, ownerId }: AddProjectModalProps) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [coCreatorIds, setCoCreatorIds] = useState<string[]>([]);
  
  const allUsers = useGeneralStore((state) => state.users);
  
  const selectableUsers = allUsers.filter(
    user => user.id !== ownerId && !coCreatorIds.includes(user.id)
  );
  
  const selectedUsers = allUsers.filter(user => 
    coCreatorIds.includes(user.id)
  );

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: {
      attributes: {
        class: 'ProseMirror'
      }
    },
    onUpdate: () => {},
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectCoCreator = (userId: string) => {
    if (userId && !coCreatorIds.includes(userId)) {
      setCoCreatorIds([...coCreatorIds, userId]);
    }
  };

  const handleRemoveCoCreator = (userId: string) => {
    setCoCreatorIds(coCreatorIds.filter(id => id !== userId));
  };

  const handleSave = () => {
    if (!editor) return;

    const descriptionHtml = editor.getHTML();
    const plainText = editor.getText().trim();

    if (!title || plainText.length === 0) {
      toast.error("Título e descrição são obrigatórios.");
      return;
    }

    const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t.length > 0);
    
    onSave({
      title,
      description: descriptionHtml,
      tags: tagsArray,
      imageUrl: imagePreview,
      ownerId: ownerId,
      coCreatorIds: coCreatorIds,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Adicionar Novo Projeto</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Título do Projeto</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Dashboard de Vendas"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <RichTextEditorToolbar editor={editor} />
            <EditorContent editor={editor} />
          </div>
          <div className="space-y-2">
            <label htmlFor="tag" className="text-sm font-medium">Tecnologias (separadas por vírgula)</label>
            <Input
              id="tag"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ex: React, TypeScript, Tailwind"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cocreators" className="text-sm font-medium">Cocriadores</label>
            <Select onValueChange={handleSelectCoCreator} value="">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecionar cocriadores..." />
              </SelectTrigger>
              <SelectContent>
                {selectableUsers.length > 0 ? (
                  selectableUsers.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>Nenhum usuário disponível</SelectItem>
                )}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedUsers.map(user => (
                <Badge key={user.id} variant="secondary" className="flex items-center gap-1">
                  {user.name}
                  <button type="button" onClick={() => handleRemoveCoCreator(user.id)} className="ml-1 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">Imagem do Projeto</label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file:text-foreground"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 rounded-md max-h-32 object-contain" />
            )}
            {!imagePreview && (
              <div className="mt-2 rounded-md h-32 w-full bg-muted flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Projeto</Button>
        </CardFooter>
      </Card>
    </div>
  );
}