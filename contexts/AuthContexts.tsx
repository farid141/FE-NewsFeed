"use client";
import axios from "@/components/Axios/AxiosInstance";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type User = {
  name: string;
};

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const fetch = async()=>{
    try{
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL+'/api/me',
        {withCredentials: true}
      )
      setUser(res.data);

    }catch {
      setUser(null);
      router.push('/');
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
