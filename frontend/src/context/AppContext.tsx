"use client";
import React, {
  useState,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import meAction from "@/actions/me-action";

import type { StrapiAuthResponse } from "@/types/strapi-custom-types";


interface MeActonResponse {
  data: StrapiAuthResponse;
  ok: boolean;
  error?: any;
}

interface AppContextType {
  user: StrapiAuthResponse | null;
  setUser: React.Dispatch<React.SetStateAction<StrapiAuthResponse| null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{
  children: React.ReactNode;
  authUser: any;
}> = ({ children }) => {
  const [user, setUser] = useState<StrapiAuthResponse | null>( null);

  const fetchData = useCallback(async () => {
    console.log("fetching data");
    try {
      const response = await meAction() as MeActonResponse;
      console.log("response", response);
      if (response?.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [ fetchData]);

  console.log("user", user);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
