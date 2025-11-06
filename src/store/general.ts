
import { create } from 'zustand';

interface GeneralState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useGeneralStore = create<GeneralState>((set) => ({
  // Initialize your state
  count: 0,
  // Implement your actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
