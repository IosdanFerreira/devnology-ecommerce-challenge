import { cn } from "@/lib/utils";
import { PackageX } from "lucide-react";

interface EmptyProps {
  text?: string;
  className?: string;
  iconSize?: number;
}

export function Empty({
  text = "Nenhum dado encontrado.",
  className,
  iconSize = 40,
}: EmptyProps) {
  return (
    <div
      className={cn(
        "w-full h-[70vh] flex flex-col items-center justify-center gap-3 text-muted-foreground",
        className
      )}
    >
      <PackageX size={iconSize} />
      <p className="text-center text-sm">{text}</p>
    </div>
  );
}
