import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};
