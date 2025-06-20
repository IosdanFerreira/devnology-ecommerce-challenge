import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="border rounded-xl shadow-sm overflow-hidden bg-white flex flex-col">
      {/* Imagem (placeholder) */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-4">
        {/* Título */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Preço e Botão */}
        <div className="flex items-center justify-between mt-2">
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
