import { Link, useLocation } from "react-router-dom";
import { Home, Heart, User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Cart } from "../cart";
import { useFavoritesStore } from "@/store/favorites-store";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";

export default function FooterMenuMobile() {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  const { user, logout } = useAuth();

  const favorites = useFavoritesStore((state) => state.items);

  return (
    <nav
      className={cn(
        "fixed bottom-0 z-50 w-full bg-white border-t border-zinc-200 shadow-md md:hidden",
        "grid grid-cols-4 h-16"
      )}
    >
      <Link
        to="/"
        className={cn(
          "flex flex-col items-center justify-center text-xs",
          location.pathname === "/"
            ? "text-orange-700 font-semibold"
            : "text-black"
        )}
      >
        <Home className="w-5 h-5 mb-1" />
        Início
      </Link>

      <div className={cn("flex flex-col items-center justify-center text-xs")}>
        <Cart />
      </div>

      <Link
        to="/favorites"
        className={cn(
          "relative flex flex-col items-center justify-center text-xs",
          location.pathname === "/favorites"
            ? "text-orange-700 font-semibold"
            : "text-black"
        )}
      >
        <Heart className="w-5 h-5 mb-1" />
        <span className="absolute right-10 top-3 translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full h-4 w-4 text-[11px] bg-red-400 text-white">
          {favorites.length}
        </span>
        Favoritos
      </Link>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild className="">
          <button className="flex flex-col items-center justify-center text-xs text-black">
            <User className="w-5 h-5 mb-1 text-black" />
            Minha conta
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-lg">Minha conta</DrawerTitle>
            <p className="text-muted-foreground text-sm">
              Bem-vindo, {user?.name}
            </p>
          </DrawerHeader>

          <div className="flex flex-col gap-2 px-4 pb-6">
            <Link
              to="/my-orders"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3 px-4 border rounded-md hover:bg-muted"
            >
              Meus pedidos <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="flex items-center justify-between py-3 px-4 border rounded-md hover:bg-muted"
            >
              Conta <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="flex items-center justify-between py-3 px-4 border rounded-md hover:bg-muted"
            >
              Configurações <ChevronRight className="w-4 h-4" />
            </Link>

            <Button
              variant="default"
              onClick={() => logout()}
              className="mt-4 bg-red-500"
            >
              Sair
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
