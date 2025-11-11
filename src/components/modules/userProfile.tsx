import { ProfileHeader } from "./ProfileHeader";
import { MedalsSection } from "./MedalsSection";
import { InterestsSection } from "./interestsSection";
import { Header } from "./header";
import type { UserProfileData } from "@/data/mockData.ts";
import { useGeneralStore } from "@/store/general";

interface UserProfileProps {
  user: UserProfileData;
  isMe?: boolean;
}

function UserProfile({ user, isMe = false }: UserProfileProps) {
  const { isAdmin } = useGeneralStore();

  const handleProfileUpdate = (data: { name: string; description: string; avatarUrl?: string }) => {
    console.log("Profile update logic here", data);
  };

  return (
    <div className="max-h-svh overflow-y-auto relative w-full bg-[#FAFAFA]">
      <Header />
      <div className="w-full h-full p-8 flex flex-col gap-12">
        <ProfileHeader
          userId={user.id}
          name={user.name}
          role={user.role}
          description={user.description}
          avatarUrl={user.avatarUrl}
          badge={user.badge}
          onUpdate={handleProfileUpdate}
          isEditable={isMe}
          isAdminView={isAdmin}
        />
        <InterestsSection interests={user.interests} isEditable={isMe} />
        <MedalsSection
          userId={user.id}
          medals={user.medals}
          isEditable={isAdmin}
        />
      </div>
    </div>
  );
}

export default UserProfile;