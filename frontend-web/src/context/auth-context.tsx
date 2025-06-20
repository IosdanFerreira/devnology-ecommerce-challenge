/* eslint-disable react-refresh/only-export-components */
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "@/api/lib/axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import type { User } from "@/interfaces/user.interface";
import type { IApiResponse } from "@/api/interface/api-response.interface";

/**
 * Interface representing the API error response structure
 */

/**
 * Interface defining the shape of the authentication context
 */
interface AuthContextType {
  /** Current authenticated user or null if not authenticated */
  user: User | null;
  /** Boolean indicating if user is authenticated */
  isAuthenticated: boolean;
  /** Boolean indicating if authentication state is being loaded */
  isLoading: boolean;
  /** Function to handle user login */
  login: (credentials: { email: string; password: string }) => Promise<void>;
  /** Function to handle user logout */
  logout: () => Promise<void>;
  /** Function to manually update user state */
  setUser: (user: User | null) => void;
  /** Authentication errors if any */
  error: string | null;
}

/**
 * Authentication context instance
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErrors] = useState<string | null>("");
  const navigate = useNavigate();

  // Fetch user data on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data.data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  /**
   * Handles user login
   * @param credentials - User login credentials
   */
  const login = async (credentials: { email: string; password: string }) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      setUser(data.data);
    } catch (err) {
      const error = err as AxiosError<IApiResponse<null>>;
      const responseErrors = error.response?.data?.message || null;
      setErrors(responseErrors);
      setIsLoading(false);
    }
  };

  /**
   * Handles user logout
   * Clears user data, CSRF token and redirects to login page
   */
  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    setErrors(null);
    navigate("/", { replace: true });
    window.location.reload();
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        setUser,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use the auth context
 * @returns The auth context
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
