import type { UserRole } from "@/types/common";
import { getCookie, removeCookie, setCookie } from "@/utils/cookie-actions";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type User = {
  id: number;
  email?: string;
  role?: UserRole;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const COOKIE_NAME = "user";

const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const cookie = getCookie(COOKIE_NAME);
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie) as User;
        setUser(parsed);
      } catch (e) {
        removeCookie(COOKIE_NAME);
      }
    }
  }, []);

  const handleSetUser = (u: User | null) => {
    setUser(u);
    if (u) {
      try {
        setCookie(COOKIE_NAME, JSON.stringify(u));
      } catch (e) {
        // ignore serialization errors
      }
    } else {
      removeCookie(COOKIE_NAME);
    }
  };

  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
export default UserContextProvider;
