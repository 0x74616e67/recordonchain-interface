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

export const useChainStore = create((set) => ({
  setChain: async (chain) => {
    localStorage.setItem("chain", chain);
    document.cookie = `chain=${chain};max-age=Infinity;expires=Fri, 31 Dec 9999 23:59:59 GMT;`;

    set(() => {
      return { chain };
    });
  },
}));

export const useTermsStore = create((set) => ({
  setAcceptance: async (acceptance) => {
    localStorage.setItem("terms", acceptance);
    document.cookie = `terms=${acceptance};max-age=Infinity;expires=Fri, 31 Dec 9999 23:59:59 GMT;`;

    set(() => {
      return { acceptance };
    });
  },
}));
