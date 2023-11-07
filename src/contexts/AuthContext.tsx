import { ReactNode, createContext, useState } from "react";

interface AuthtProviderProps {
  children: ReactNode;
}

type AuthContextProps = {
  signed: boolean;
};

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({ children }: AuthtProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);

  return (
    <AuthContext.Provider value={{ signed: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
