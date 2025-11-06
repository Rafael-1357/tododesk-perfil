import { Home, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import defaultAvatar from "@/assets/default-avatar.png";

interface HeaderProps {
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  breadcrumb?: string;
}

export const Header = ({ 
  userName = "RAFAEL SILVEIRA", 
  userRole = "Desenvolvedor Front-End",
  userAvatar = defaultAvatar,
  breadcrumb = "Desvios"
}: HeaderProps) => {
  return (
    <header className="w-full bg-background border-b border-border">
      <div className="mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Home className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Button>
            <span className="text-lg font-semibold text-pink-500 ml-2">
              {breadcrumb}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground leading-tight">
                  {userName}
                </span>
                <span className="text-xs text-muted-foreground leading-tight">
                  {userRole}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
