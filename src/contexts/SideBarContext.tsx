import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface ISideBarContextData {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export const SideBarContext = createContext<ISideBarContextData>({});

export interface ISideBarProviderProps {
  children: ReactNode;
}

export function SideBarProvider({ children }: ISideBarProviderProps) {
  const [open, setOpen] = useState<boolean>();

  return (
    <SideBarContext.Provider value={{
      open,
      setOpen
    }}>
      {children}
    </SideBarContext.Provider>
  );
}