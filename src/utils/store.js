import { create } from "zustand";

export const useTxStore = create((set) => ({
  tx: {},
  add: (tx) => set(() => ({ tx })),
  remove: () => set({}, true),
}));
