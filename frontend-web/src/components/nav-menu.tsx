import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/",
    label: "Produtos",
  },
  {
    href: "/",
    label: "Categorias",
  },
  {
    href: "/",
    label: "Sobre nós",
  },
  {
    href: "/",
    label: "Contato",
  },
];

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="hidden md:flex space-x-4">
        {routes.map((route) => (
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className="p-0 flex items-center justify-center"
            >
              <Link
                to="/"
                className={cn(
                  "text-[13px] font-medium transition-colors p-0 text-[#383838]",
                  "md:text-[16px]",
                  "hover:bg-transparent hover:underline"
                )}
              >
                {route.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
