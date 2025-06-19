import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import FooterMenuMobile from "./footer-menu-mobile";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center bg-[#0e0e0e] text-white border-t">
      {/* Grid principal */}
      <div
        className={cn(
          "container px-4 py-8 grid gap-5",
          "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:py-15 md:gap-8"
        )}
      >
        <div className="flex flex-col gap-4 items-baseline">
          <Logo colorVariant="white" />

          <p className={cn("text-md", "text-sm")}>
            Os melhores produtos para você com qualidade e agilidade na entrega.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="text-md font-bold text-white mb-2">Navegação</h3>
          <ul className={cn("space-y-1 text-sm", "md:text-md")}>
            <li>
              <Link to="/" className="hover:underline">
                Início
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Produtos
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:underline">
                Categorias
              </Link>
            </li>
          </ul>
        </div>

        {/* Institucional */}
        <div>
          <h3 className="text-md font-bold text-white mb-2">Institucional</h3>
          <ul className={cn("space-y-1 text-sm", "md:text-md")}>
            <li>
              <Link to="" className="hover:underline">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                Política de privacidade
              </Link>
            </li>
            <li>
              <Link to="" className="hover:underline">
                Termos de uso
              </Link>
            </li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-md font-bold text-white mb-2">Contato</h3>
          <ul className={cn("space-y-1 text-sm", "md:text-md")}>
            <li className="flex items-center gap-2">
              <Link
                to={"/"}
                className="flex items-center gap-2 hover:underline"
              >
                <Phone className="h-4 w-4" /> (11) 99999-9999
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Link
                to={"/"}
                className="flex items-center gap-2 hover:underline"
              >
                <Mail className="h-4 w-4" /> contato@devnology.com
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Link
                to={"/"}
                className="flex items-center gap-2 hover:underline"
              >
                <FaInstagram className="h-4 w-4" /> @devnology
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Link
                to={"/"}
                className="flex items-center gap-2 hover:underline"
              >
                <LuFacebook className="h-4 w-4" /> /devnology
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Separador e copyright */}
      <Separator />

      <div
        className={cn(
          "text-center text-xs text-muted-white py-4 px-4 pb-20 md:pb-4",
          "md:text-sm"
        )}
      >
        © {new Date().getFullYear()} DevNology. Todos os direitos reservados.
      </div>

      <FooterMenuMobile />
    </footer>
  );
}
