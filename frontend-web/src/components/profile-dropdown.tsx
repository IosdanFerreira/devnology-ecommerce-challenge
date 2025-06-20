import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth-context";
import { ChevronDown } from "lucide-react";

export function ProfileDropdown() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-center py-5 border-[#cacaca] cursor-pointer"
            >
              <FaRegUser className="text-black" />
              Minha conta
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" forceMount>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/login" className="cursor-pointer hover:bg-[#f3f3f3]">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/signup"
                  className="cursor-pointer hover:bg-[#f3f3f3]"
                >
                  Cadastrar-se
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center justify-center py-5 border-[#cacaca] cursor-pointer"
            >
              <FaRegUser className="text-black" />
              <span className="capitalize">{user?.name}</span>

              <ChevronDown className=" h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" forceMount>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  to="/my-orders"
                  className="cursor-pointer hover:bg-[#f3f3f3]"
                >
                  Meus pedidos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to="/" className="cursor-pointer">
                    Conta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" className="cursor-pointer">
                    Configurações
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>Sair</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
