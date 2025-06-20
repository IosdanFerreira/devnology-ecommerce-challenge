import { cn } from "@/lib/utils";
import { TbBrandDeviantart } from "react-icons/tb";
import { Link } from "react-router-dom";

interface LogoProps {
  colorVariant?: "black" | "white";
}

export default function Logo({ colorVariant = "black" }: LogoProps) {
  const colorClass =
    colorVariant === "white" ? "text-white" : "text-emerald-600";

  return (
    <Link to="/" className="flex items-center justify-center cursor-pointer">
      <TbBrandDeviantart
        className={cn("text-xl text-emerald-600", "md:text-3xl")}
      />
      <span
        className={cn(" text-xl font-[Caprasimo]", "md:text-2xl", colorClass)}
      >
        DevNology
      </span>
    </Link>
  );
}
