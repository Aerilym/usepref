import type {PreferenceStorage} from "../storage/preference-storage.js";
import {createContext, type ReactNode, useContext} from "react";

type PreferencesContext = {
  preferenceStorage: PreferenceStorage;
};

const Context = createContext<PreferencesContext | undefined>(undefined);

export function PreferencesProvider({preferenceStorage, children}: {
  preferenceStorage: PreferenceStorage,
  children: ReactNode
}) {
  return <Context.Provider value={{preferenceStorage}}>{children}</Context.Provider>;
}

export const usePreferences = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('usePreferences must be used inside PreferencesProvider')
  }

  const instance = context.preferenceStorage

  return {
    getItem: instance.getItem.bind(instance),
    setItem: instance.setItem.bind(instance),
  }
}

export const usePref = usePreferences;