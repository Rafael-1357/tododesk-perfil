import { useState, useMemo } from "react";
import { Header } from "./header";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { UserSearchCard, type UserSearchCardProps } from "./userSearchCard";
import { useGeneralStore } from "@/store/general";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SearchProfileContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Todos os cargos");
  const allUsers = useGeneralStore((state) => state.users);

  const mockUsers: UserSearchCardProps[] = allUsers.map(user => ({
    id: user.id,
    name: user.name,
    role: user.role,
    avatarUrl: user.avatarUrl,
    description: user.description,
    interestsTags: user.interests.map(i => i.label),
  }));

  const allRoles = useMemo(() => {
    const roles = new Set(mockUsers.map(user => user.role));
    return ["Todos os cargos", ...Array.from(roles)];
  }, [mockUsers]);

  const filteredUsers = mockUsers.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearchTerm =
      user.name.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      user.interestsTags.some(tag => tag.toLowerCase().includes(searchLower));

    const matchesRole =
      selectedRole === "Todos os cargos" || user.role === selectedRole;

    return matchesSearchTerm && matchesRole;
  });

  return (
    <div className="max-h-svh overflow-y-auto relative w-full bg-[#FAFAFA]">
      <Header />
      <div className="w-full h-full p-8 flex flex-col gap-8">
        
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nome, cargo ou interesses..."
                className="pl-10 h-10 text-base md:text-sm bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedRole} onValueChange={setSelectedRole} >
              <SelectTrigger className="w-full sm:w-[200px] h-10 bg-white">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {allRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'perfil encontrado' : 'perfis encontrados'}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserSearchCard key={user.id} {...user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchProfileContent;