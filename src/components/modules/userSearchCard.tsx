import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface UserSearchCardProps {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  description: string;
  interestsTags: string[];
}

export const UserSearchCard = ({
  id,
  name,
  role,
  avatarUrl,
  description,
  interestsTags,
}: UserSearchCardProps) => {

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground truncate">{name}</h3>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {interestsTags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/profile/${id}`}>Ver Perfil</Link>
        </Button>
      </CardContent>
    </Card>
  );
};