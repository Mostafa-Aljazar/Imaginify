import { create } from "zustand";
import type { User, Transformation } from "../../generated/prisma";
import { getUserData } from "@/actions/get-user-data";

interface UserData extends User {
  transformations: Transformation[];
}

interface UserStore {
  user: UserData | null;
  setUser: (user: UserData) => void;
  clearUser: () => void;
  fetchUser: (clerkId: string) => Promise<void>;
  addTransformation: (transformation: Transformation) => void;
  updateTransformation: (transformation: Transformation) => void;
  removeTransformation: (transId: string) => void;
  incrementCredits: (amount: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  fetchUser: async (clerkId: string) => {
    const data = await getUserData({ userClerkId: clerkId });
    if (data) set({ user: data });
  },

  addTransformation: (transformation: Transformation) =>
    set((prev) => ({
      user: prev.user
        ? {
            ...prev.user,
            creditsAvailable: prev.user.creditsAvailable - 1,
            imageManipulationsDone: prev.user.imageManipulationsDone + 1,
            transformations: [...prev.user.transformations, transformation],
          }
        : null,
    })),

  updateTransformation: (transformation: Transformation) =>
    set((prev) => ({
      user: prev.user
        ? {
            ...prev.user,
            creditsAvailable: prev.user.creditsAvailable - 1,
            transformations: [
              ...prev.user.transformations.filter(
                (item) => item.id !== transformation.id
              ),
              transformation,
            ],
          }
        : null,
    })),

  removeTransformation: (transId: string) =>
    set((prev) => ({
      user: prev.user
        ? {
            ...prev.user,
            imageManipulationsDone: prev.user.imageManipulationsDone - 1,
            transformations: [
              ...prev.user.transformations.filter(
                (item) => item.id !== transId
              ),
            ],
          }
        : null,
    })),

  incrementCredits: (amount: number) =>
    set((prev) => ({
      user: prev.user
        ? {
            ...prev.user,
            creditsAvailable: prev.user.creditsAvailable + amount,
          }
        : null,
    })),
}));
