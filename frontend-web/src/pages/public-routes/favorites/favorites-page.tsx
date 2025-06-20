import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites-store";
import ProductCard from "@/components/product-card";

export default function FavoritesPage() {
  const { items: favorites } = useFavoritesStore();

  return (
    <main className="w-full flex flex-col items-center justify-center px-3">
      <div className="container">
        <Breadcrumb className="my-6 text-sm text-muted-foreground">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Favoritos</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-xl md:text-2xl font-semibold mb-6">
          Meus Favoritos
        </h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="w-10 h-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              Você ainda não adicionou nenhum produto aos favoritos.
            </p>
            <Button asChild>
              <Link to="/">Explorar produtos</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
