import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function ProfileDropdown() {
  return (
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
            <Link
              to="/dashboard/minha-conta"
              className="cursor-pointer hover:bg-[#f3f3f3]"
            >
              Login
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              to="/dashboard/configurações"
              className="cursor-pointer hover:bg-[#f3f3f3]"
            >
              Cadastrar-se
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
