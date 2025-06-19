import { Link, useLocation } from "react-router-dom";
import { Home, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Cart } from "../cart";
import { useFavoritesStore } from "@/store/favorites-store";

export default function FooterMenuMobile() {
  const location = useLocation();

  const favorites = useFavoritesStore((state) => state.items);

  return (
    <nav
      className={cn(
        "fixed bottom-0 z-50 w-full bg-white border-t border-zinc-200",
        "flex justify-around items-center h-16 shadow-md md:hidden"
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
        <span className="absolute right-2 top-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full h-4 w-4 text-[11px] bg-red-400 text-white">
          {favorites.length}
        </span>
        Favoritos
      </Link>

      <Link
        to="/account"
        className={cn(
          "flex flex-col items-center justify-center text-xs",
          location.pathname === "/account"
            ? "text-orange-700 font-semibold"
            : "text-black"
        )}
      >
        <User className="w-5 h-5 mb-1" />
        Minha conta
      </Link>
    </nav>
  );
}
