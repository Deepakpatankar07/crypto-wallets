"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface MnemonicContextType {
  mnemonic: string | null;
  setMnemonic: (mnemonic: string) => void;
}

const MnemonicContext = createContext<MnemonicContextType | undefined>(undefined);

export const MnemonicProvider = ({ children }: { children: ReactNode }) => {
  const [mnemonic, setMnemonic] = useState<string | null>(null);

  return (
    <MnemonicContext.Provider value={{ mnemonic, setMnemonic }}>
      {children}
    </MnemonicContext.Provider>
  );
};

export const useMnemonic = (): MnemonicContextType => {
  const context = useContext(MnemonicContext);
  if (!context) {
    throw new Error("useMnemonic must be used within a MnemonicProvider");
  }
  return context;
};
