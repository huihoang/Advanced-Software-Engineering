import { useContext } from "react";
import { UserContext } from "@/components/providers/UserContextProvider";

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserContextProvider");
  return ctx;
};
