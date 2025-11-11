import { Award, Trophy, Star, Medal, Target, Zap, Code, Palette, Music, Book, Rocket, Heart, Cpu, Globe, Coffee, Gamepad2, Plane, Dumbbell, Film, Utensils } from "lucide-react";
import dalapa from "@/assets/default-avatar.png";
import defaultAvatar from "@/assets/nova_logo.svg";

export interface Interest {
  label: string;
  icon: React.ElementType;
}

export interface Medal {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

export interface Badge {
  sigla: string;
  nome: string;
}

export interface UserProfileData {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  description: string;
  interests: Interest[];
  medals: Medal[];
  badges?: Badge[];
}

const interestsMap: Record<string, Interest> = {
  webDev: { label: "Web Development", icon: Code },
  uiUx: { label: "UI/UX Design", icon: Palette },
  music: { label: "Music Production", icon: Music },
  reading: { label: "Reading", icon: Book },
  space: { label: "Space Exploration", icon: Rocket },
  health: { label: "Health & Wellness", icon: Heart },
  ai: { label: "AI & Machine Learning", icon: Cpu },
  travel: { label: "Travel", icon: Globe },
  coffee: { label: "Coffee", icon: Coffee },
  gaming: { label: "Gaming", icon: Gamepad2 },
  aviation: { label: "Aviation", icon: Plane },
  fitness: { label: "Fitness", icon: Dumbbell },
  movies: { label: "Movies", icon: Film },
  cooking: { label: "Cooking", icon: Utensils },
};

export const allInterestsList: Interest[] = Object.values(interestsMap);

const allMedals = {
  champion: {
    icon: Trophy,
    title: "Campeão",
    description: "Ganhou o primeiro lugar nas olimpíadas de qualidade",
    color: "from-amber-500 to-amber-600",
  },
  star: {
    icon: Star,
    title: "Estrela do Mês",
    description: "Melhor desempenho do mês de Maio",
    color: "from-blue-500 to-blue-600",
  },
  expert: {
    icon: Award,
    title: "Expecialista",
    description: "Concluiu 10 cursos avançados",
    color: "from-purple-500 to-purple-600",
  },
  collector: {
    icon: Medal,
    title: "Colecionador",
    description: "Mais de 10 tramas de elegios",
    color: "from-green-500 to-green-600",
  },
  focused: {
    icon: Target,
    title: "Focado",
    description: "3 meses seguidos com CSAT acima de 95%",
    color: "from-red-500 to-red-600",
  },
  sprinter: {
    icon: Zap,
    title: "Velocista",
    description: "Menor TMA do trimestre",
    color: "from-yellow-500 to-yellow-600",
  },
};

export const rafaelUser: UserProfileData = {
  id: "rafael-silveira",
  name: "Rafael da Lapa Silveira",
  role: "Desenvolvedor Front-End",
  avatarUrl: dalapa,
  description: "Apaixonado por destrinchar problemas complexos e transformá-los em soluções elegantes e funcionais. Sou movido pela curiosidade, adorando aprender e dominar novas tecnologias, e tenho um forte compromisso em compartilhar todo esse conhecimento com a comunidade.",
  interests: [
    interestsMap.webDev,
    interestsMap.uiUx,
    interestsMap.music,
    interestsMap.reading,
    interestsMap.space,
    interestsMap.health,
    interestsMap.ai,
    interestsMap.travel,
  ],
  medals: [
    allMedals.champion,
    allMedals.star,
    allMedals.expert,
    allMedals.collector,
    allMedals.focused,
    allMedals.sprinter,
  ],
  badges: [],
};

export const otherUsers: UserProfileData[] = [
  {
    id: "ana-clara",
    name: "Ana Clara",
    role: "UI/UX Designer",
    avatarUrl: defaultAvatar,
    description: "Designer focada em experiências de usuário intuitivas e acessíveis.",
    interests: [interestsMap.uiUx, interestsMap.health, interestsMap.movies, interestsMap.cooking],
    medals: [allMedals.star, allMedals.expert],
    badges: [],
  },
  {
    id: "bruno-gomes",
    name: "Bruno Gomes",
    role: "Desenvolvedor Back-End",
    avatarUrl: defaultAvatar,
    description: "Especialista em microserviços e arquitetura de dados em larga escala.",
    interests: [interestsMap.ai, interestsMap.coffee, interestsMap.gaming],
    medals: [allMedals.sprinter, allMedals.focused],
    badges: [],
  },
  {
    id: "carla-dias",
    name: "Carla Dias",
    role: "Gerente de Projetos",
    avatarUrl: defaultAvatar,
    description: "Liderando equipes ágeis para entregar software de alta qualidade no prazo.",
    interests: [interestsMap.reading, interestsMap.travel, interestsMap.fitness],
    medals: [allMedals.champion, allMedals.collector, allMedals.star],
    badges: [
      { sigla: "PMP", nome: "Project Master" },
      { sigla: "CSM", nome: "Scrum Master" }
    ],
  },
];

export const allUsers = [rafaelUser, ...otherUsers];