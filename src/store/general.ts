import { create } from 'zustand';
import { 
  allUsers, 
  allProjects,
  type UserProfileData, 
  type Medal, 
  type Badge, 
  type Project 
} from '@/data/mockData.ts';

interface GeneralState {
  isAdmin: boolean;
  toggleAdmin: () => void;
  users: UserProfileData[];
  projects: Project[];
  addMedalToUser: (userId: string, medal: Medal) => void;
  removeMedalFromUser: (userId: string, medalIndex: number) => void;
  addUserBadge: (userId: string, badge: Badge) => void;
  removeUserBadge: (userId: string, badgeIndex: number) => void;
  updateUserDescription: (userId: string, description: string) => void;
  addProject: (newProjectData: Omit<Project, 'id'>) => void;
  removeProject: (projectId: string) => void;
}

export const useGeneralStore = create<GeneralState>((set) => ({
  isAdmin: false,
  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
  
  users: allUsers,
  projects: allProjects,

  addMedalToUser: (userId, medal) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? { ...user, medals: [...user.medals, medal] }
          : user
      ),
    })),

  removeMedalFromUser: (userId, medalIndex) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? { ...user, medals: user.medals.filter((_, index) => index !== medalIndex) }
          : user
      ),
    })),
  
  addUserBadge: (userId, badge) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? { ...user, badges: [...(user.badges || []), badge] }
          : user
      ),
    })),

  removeUserBadge: (userId, badgeIndex) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId
          ? { ...user, badges: (user.badges || []).filter((_, index) => index !== badgeIndex) }
          : user
      ),
    })),
  
  updateUserDescription: (userId, description) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, description: description } : user
      ),
    })),

  addProject: (newProjectData) =>
    set((state) => ({
      projects: [
        ...state.projects,
        { ...newProjectData, id: `proj_${Date.now()}` },
      ],
    })),

  removeProject: (projectId) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== projectId),
    })),
}));