import { create } from 'zustand';
import { allUsers, type UserProfileData, type Medal, type Badge } from '@/data/mockData.ts';

interface GeneralState {
  isAdmin: boolean;
  toggleAdmin: () => void;
  users: UserProfileData[];
  addMedalToUser: (userId: string, medal: Medal) => void;
  removeMedalFromUser: (userId: string, medalIndex: number) => void;
  addUserBadge: (userId: string, badge: Badge) => void;
  removeUserBadge: (userId: string, badgeIndex: number) => void;
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
}));