import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProductPageSkeleton() {
  return (
    <div className="container animate-pulse px-3 py-6">
      {/* Breadcrumb */}
      <Skeleton className="h-4 w-40 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
        {/* Galeria */}
        <div className="space-y-4">
          <Skeleton className="w-full h-[400px] rounded-xl" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-md" />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />

          <div className="flex gap-2 items-center mt-2">
            <Skeleton className="w-16 h-10 rounded" />
            <Skeleton className="h-10 w-40 rounded" />
          </div>

          <div className="flex gap-4 pt-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="description">
        <TabsList className="mb-6">
          <TabsTrigger value="description">Descrição</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </TabsContent>
        <TabsContent value="reviews">
          <Skeleton className="h-4 w-1/3" />
        </TabsContent>
      </Tabs>

      {/* Produtos relacionados */}
      <div className="mt-12">
        <Skeleton className="h-6 w-64 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-2 space-y-2">
              <Skeleton className="h-32 w-full rounded" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
