import { useState } from "react";
import { ProfileHeader } from "./ProfileHeader"
import { MedalsSection } from "./MedalsSection";
import { InterestsSection } from "./interestsSection";
import { Header } from "./header";

function UserProfile() {

  const [profileData, setProfileData] = useState({
    name: "Rafael da Lapa Silveira",
    role: "Desenvolvedor Front-End",
    description: "Apaixonado por destrinchar problemas complexos e transformá-los em soluções elegantes e funcionais. Sou movido pela curiosidade, adorando aprender e dominar novas tecnologias, e tenho um forte compromisso em compartilhar todo esse conhecimento com a comunidade.",
  });

  const handleProfileUpdate = (data: { name: string; description: string; avatarUrl?: string }) => {
    setProfileData({
      ...profileData,
      name: data.name,
      description: data.description,
    });
  };

  return (
    <div className="max-h-svh overflow-y-auto relative w-full">
      <Header />
      <div className="w-full h-full p-8 bg-[#FAFAFA] flex flex-col gap-12">
        <ProfileHeader
          name={profileData.name}
          role={profileData.role}
          description={profileData.description}
          onUpdate={handleProfileUpdate}
        />
          <InterestsSection />
          <MedalsSection />
      </div>
    </div>
  )
}

export default UserProfile