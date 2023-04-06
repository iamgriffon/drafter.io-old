import { createContext, ReactNode, useContext } from "react";

interface DraftContextProps {}

interface DraftProviderProps {
  children: ReactNode;
}

const DraftContext = createContext({} as DraftContextProps);

export const DraftProvider = ({ children }: DraftProviderProps) => {
  return <DraftContext.Provider value="">{children}</DraftContext.Provider>;
};

export const useDraft = () => useContext(DraftContext);
