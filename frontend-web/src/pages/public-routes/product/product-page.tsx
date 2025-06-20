import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/modules/product/get-product-by-id";
import { convertToReal } from "@/utils/convert-to-real";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ProductPageSkeleton } from "./components/product-page-skeleton";
import { getAllProducts } from "@/api/modules/product/get-all-products";
import ProductCard from "@/components/product-card";
import { useFavoritesStore } from "@/store/favorites-store";
import { Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductGallery from "./components/product-galery";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const [productQuantity, setProductQuantity] = useState<number>(1);

  const productById = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });
  const product = productById?.data?.data;

  const relatedProducts = useQuery({
    queryKey: ["related-products", id],
    queryFn: () =>
      getAllProducts({
        page: 1,
        perPage: 12,
        filter: product?.category,
        hasDiscount: false,
      }),
    enabled: !!id && !!product?.category,
  });

  const { addToCart } = useCartStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const finalPrice = product?.hasDiscount
    ? product?.price - product?.discountValue
    : product?.price;

  if (productById.isLoading) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="container">
          <ProductPageSkeleton />;
        </div>
      </div>
    );
  }

  return (
    <main className="w-full flex flex-col items-center px-3 bg-[#F9F9F9]">
      <div className="container">
        {/* Breadcrumb */}
        <Breadcrumb className="my-6 text-sm text-muted-foreground">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Produtos</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="text-foreground">
                {product?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
          {/* Galeria */}
          <ProductGallery product={product} />

          {/* Informações */}
          <div className={cn("flex flex-col gap-2", "md:gap-4")}>
            <div className="flex items-center gap-4 flex-wrap">
              <h1
                className={cn(
                  "font-semibold",
                  "text-xl sm:text-2xl md:text-3xl"
                )}
              >
                {product?.name}
              </h1>
              <button
                onClick={() =>
                  isFavorite(product!.id)
                    ? removeFavorite(product!.id)
                    : addFavorite(product!)
                }
                className="w-fit cursor-pointer hover:bg-transparent"
              >
                {isFavorite(product!.id) ? (
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-red-500 stroke-red-500" />
                ) : (
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
                )}
              </button>
            </div>

            <p
              className={cn(
                "text-muted-foreground",
                "text-sm md:text-base leading-relaxed"
              )}
            >
              {product?.description}
            </p>

            <div className="flex flex-col gap-2 md:gap-3 pt-2 pb-4 text-sm md:text-base text-black">
              {[
                { label: "Categoria", value: product?.category },
                { label: "Material", value: product?.material },
                { label: "Departamento", value: product?.department },
                { label: "Fornecedor", value: product?.supplier },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-2">
                  <span className="text-[#4e4e4e]">{label}:</span>
                  <span className="font-semibold">{value || "—"}</span>
                </div>
              ))}
            </div>

            <div className="text-xl md:text-2xl font-bold mb-2">
              {product?.hasDiscount ? (
                <>
                  <span className="line-through text-red-400 mr-2 text-sm md:text-base">
                    {convertToReal(product?.price)}
                  </span>
                  <span className="text-green-600">
                    {convertToReal(finalPrice)}
                  </span>
                </>
              ) : (
                convertToReal(product?.price)
              )}
            </div>

            <div className="flex gap-2 flex-col md:flex-row  mb-2">
              <div className="flex gap-2">
                <Input
                  type="number"
                  defaultValue={1}
                  min={1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProductQuantity(e.target.valueAsNumber)
                  }
                  className="w-16 text-center border rounded-md px-2 py-6 border-[#cacaca] font-black"
                />
                <Button
                  className={cn(
                    "bg-[#202020] w-10/12 md:w-fit cursor-pointer py-6 text-[16px] font-semibold"
                  )}
                  onClick={() => {
                    addToCart({ product: product!, quantity: productQuantity });
                    toast("Produto adicionado ao carrinho", {
                      style: {
                        background: "#009966",
                        color: "#fff",
                        fontSize: "15px",
                      },
                    });
                  }}
                >
                  Adicionar ao carrinho
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description & Reviews */}
        <div className=" mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="description" className="cursor-pointer">
                Descrição
              </TabsTrigger>
              <TabsTrigger value="reviews" className="cursor-pointer">
                Avaliações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <p className="text-muted-foreground leading-relaxed">
                {product?.description}
              </p>
            </TabsContent>
            <TabsContent value="reviews">
              <p className="text-muted-foreground">Sem avaliações ainda.</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Produtos relacionados - exemplo estático */}
        <div className=" mb-16">
          <h2 className="text-xl font-bold mb-4">Produtos relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts?.data?.data?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
