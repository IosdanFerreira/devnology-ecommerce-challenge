import { useAuth } from "@/context/auth-context";
import { Navigate, Outlet } from "react-router-dom";

const AuthOnlyPublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthOnlyPublicRoute;
