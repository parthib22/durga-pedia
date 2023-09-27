"use client";
import React, { createContext, useState, ReactNode } from "react";

type ContextType = {
  contextValue: string | null;
  setContextData: (data: string | null) => void;
};

const MyContext = createContext<ContextType | null>(null);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contextValue, setContextValue] = useState<string | null>(null);

  const setContextData = (data: string | null) => {
    setContextValue(data);
  };

  return (
    <MyContext.Provider value={{ contextValue, setContextData }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
