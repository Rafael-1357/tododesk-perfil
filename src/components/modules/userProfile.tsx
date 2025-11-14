import { ProfileHeader } from "./profileHeader";
import { MedalsSection } from "./medalsSection";
import { InterestsSection } from "./interestsSection";
import { ProjectsSection } from "./projectsSection";
import { Header } from "./header";
import type { UserProfileData } from "@/data/mockData.ts";
import { useGeneralStore } from "@/store/general";
import { AdminStatsPanel } from "./adminStatsPanel";

interface UserProfileProps {
  user: UserProfileData;
  isMe?: boolean;
}

function UserProfile({ user, isMe = false }: UserProfileProps) {
  const { isAdmin, updateUserDescription } = useGeneralStore();

  const handleProfileUpdate = (data: { name: string; description: string; avatarUrl?: string }) => {
    updateUserDescription(user.id, data.description);
  };

  return (
    <div className="relative w-full bg-[#FAFAFA] flex flex-col max-h-svh">
      <Header />

      {isAdmin && <AdminStatsPanel stats={user.stats} />}

      <div className="flex flex-row gap-8 w-full p-8 overflow-hidden overflow-y-auto">
        <div className="w-[400px]">
          <ProfileHeader
            userId={user.id}
            name={user.name}
            role={user.role}
            description={user.description}
            avatarUrl={user.avatarUrl}
            badges={user.badges}
            onUpdate={handleProfileUpdate}
            isEditable={isMe}
            isAdminView={isAdmin}
          />
        </div>

        <div className="flex-1 flex flex-col gap-12 pb-16">
          <InterestsSection interests={user.interests} isEditable={isMe} />
          <MedalsSection
            userId={user.id}
            medals={user.medals}
            isEditable={isAdmin}
          />
          {/* A prop 'projects' foi removida abaixo */}
          <ProjectsSection
            userId={user.id}
            isEditable={isMe}
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;