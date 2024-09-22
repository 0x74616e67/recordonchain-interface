import { create } from "zustand";

export const useTxStore = create((set) => ({
  tx: {},
  add: (tx) => set(() => ({ tx })),
  remove: () => set({}, true),
}));

export const useLocaleStore = create((set) => ({
  setLocale: async (locale) => {
    localStorage.setItem("locale", locale);
    document.cookie = `locale=${locale};max-age=Infinity;expires=Fri, 31 Dec 9999 23:59:59 GMT;`;

    set(() => {
      return { locale };
    });
  },
}));
