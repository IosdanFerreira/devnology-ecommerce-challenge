import { cn } from "@/lib/utils";
import Logo from "./logo";
import { SearchForm } from "./search";
import { Cart } from "../cart";
import { FiShoppingBag } from "react-icons/fi";
import { ProfileDropdown } from "../profile-dropdown";
import NavMenu from "../nav-menu";
import { useFavoritesStore } from "@/store/favorites-store";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

export default function Header() {
  const favorites = useFavoritesStore((state) => state.items);

  return (
    <header
      className={cn(
        "w-full flex flex-col items-center justify-center border-b border-[#dfdfdf]",
        "pt-4 sm:pb-4 px-3",
        "md:px-6"
      )}
    >
      <div
        className={cn(
          "container flex flex-col items-center gap-2 justify-between",
          "sm:gap-4",
          "sm:flex-row md:gap-0"
        )}
      >
        {/* Logo + Menu desktop */}
        <div
          className={cn(
            "flex items-center justify-between w-full",
            "md:w-auto md:justify-start md:gap-12"
          )}
        >
          <Logo />
        </div>

        {/* Área de busca + Ações */}
        <div
          className={cn(
            "flex flex-col gap-4 items-baseline w-full",
            "sm:flex-row sm:items-center sm:justify-between sm:gap-6",
            "md:w-auto md:flex-row md:gap-5"
          )}
        >
          <SearchForm />

          {/* Menu mobile */}
          <div className={cn("block", "md:hidden")}>
            <NavMenu />
          </div>

          {/* Cart, Favoritos e Perfil no desktop */}
          <div className={cn("hidden", "md:flex md:items-center md:gap-3")}>
            <Cart />

            <Link
              to="/favorites"
              className={cn(
                "relative flex items-center justify-center rounded-md border border-[#cacaca]",
                "px-3 py-3 cursor-pointer"
              )}
            >
              <FiShoppingBag className="w-4 h-4" />
              <span
                className={cn(
                  "absolute right-0 top-0 translate-x-1/2 -translate-y-1/2",
                  "flex items-center justify-center rounded-full",
                  "h-4 w-4 text-[11px] bg-red-400 text-white"
                )}
              >
                {favorites.length}
              </span>
            </Link>

            <ProfileDropdown />
          </div>
        </div>
      </div>

      <Separator className="hidden md:block my-3 " />

      <div className="container">
        <div className={cn("hidden", "md:block self-baseline")}>
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
