import { ReactNode, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebaseConnection";

interface AuthtProviderProps {
  children: ReactNode;
}

type AuthContextProps = {
  signed: boolean;
  isLoading: boolean;
  handleInfo: ({ name, uid, email }: UserProps) => void;
  user: UserProps | null;
};

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({ children }: AuthtProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        //tem user logado
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });

        setIsLoading(false);
      } else {
        // não tem user logado
        setUser(null);
        setIsLoading(true);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  function handleInfo({ name, uid, email }: UserProps) {
    setUser({
      name: name,
      email: email,
      uid: uid,
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, isLoading, handleInfo, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
