"use client";
import { createContext, PropsWithChildren, useContext } from "react";
import { useForm } from "react-hook-form";

import { UserInfoFormType, userInfoFormValidator } from "@/schemas/user-info.schema";

type AppContextType = {
  userInfoForm: ReturnType<typeof useForm<UserInfoFormType>>;
};

const AppContext = createContext<AppContextType | null>(null);

type AppContextProviderProps = PropsWithChildren<{}>;

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const userInfoForm = useForm<UserInfoFormType>({
    resolver: userInfoFormValidator,
  });

  return (
    <AppContext
      value={{
        userInfoForm,
      }}
    >
      {children}
    </AppContext>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
