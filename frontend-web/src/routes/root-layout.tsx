import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { AuthProvider } from "@/context/auth-context";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export const RootLayout = () => {
  return (
    <main className="overflow-hidden">
      <AuthProvider>
        <Header />
        <Outlet />
        <Footer />
        <Toaster />
      </AuthProvider>
    </main>
  );
};
