import { create } from 'zustand';
import { allUsers, type UserProfileData, type Medal } from '@/data/mockData.ts';

interface GeneralState {
  isAdmin: boolean;
  toggleAdmin: () => void;
  users: UserProfileData[];
  addMedalToUser: (userId: string, medal: Medal) => void;
  removeMedalFromUser: (userId: string, medalIndex: number) => void;
  updateUserBadge: (userId: string, badge: { sigla: string; nome: string; }) => void;
}

export const useGeneralStore = create<GeneralState>((set) => ({
  isAdmin: false,
  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
  
  users: allUsers,

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
  
  updateUserBadge: (userId, badge) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, badge: badge } : user
      ),
    })),
}));