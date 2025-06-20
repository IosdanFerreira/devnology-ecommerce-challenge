import { useQuery } from "@tanstack/react-query";
import BenefitCard from "./components/benefit-card";
import Hero from "./components/hero";
import { benefitsData } from "./data/benefits-data";
import type { IApiResponse } from "@/api/interface/api-response.interface";
import type { IProduct } from "@/interfaces/product.interface";
import { getAllProducts } from "@/api/modules/product/getAllProducts";
import ProductCard from "@/components/product-card";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";
import type { IQueryParams } from "@/api/interface/query-params";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const productsWithDiscountQueryParams: IQueryParams = {
    page: 1,
    perPage: 16,
    sort: "createdAt",
    sortDir: "desc",
    hasDiscount: true,
  };

  const productsWithDiscount = useQuery<IApiResponse<IProduct[]>>({
    queryKey: ["products-discount", productsWithDiscountQueryParams],
    queryFn: () => getAllProducts(productsWithDiscountQueryParams),
  });

  const newProductsQueryParams: IQueryParams = {
    page: 1,
    perPage: 32,
    sort: "createdAt",
    sortDir: "desc",
    hasDiscount: false,
  };

  const newProducts = useQuery<IApiResponse<IProduct[]>>({
    queryKey: ["new-products", newProductsQueryParams],
    queryFn: () => getAllProducts(newProductsQueryParams),
  });

  return (
    <main className="bg-[#fdfdfd] px-3">
      <Hero />

      {/* Benefits */}
      <section
        className={cn(
          "w-full flex flex-col items-center justify-center my-4",
          "md:mb-6 md:px-0"
        )}
      >
        <div className="container">
          <div
            className={cn(
              "flex flex-col gap-2",
              "md:flex-row md:gap-2 md:justify-between"
            )}
          >
            {benefitsData.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* Discounted Products */}
      <section
        className={cn(
          "w-full flex flex-col items-center justify-center mt-9 mb-6",
          "md:px-0"
        )}
      >
        <div className="container">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5">
            Produtos em promoção
          </h2>

          <div
            className={cn(
              "grid grid-cols-2 gap-2",
              "sm:grid-cols-3 sm:gap-4",
              "lg:grid-cols-4 lg:gap-6"
            )}
          >
            {productsWithDiscount.isLoading
              ? Array.from({ length: 15 }).map((_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))
              : productsWithDiscount.data?.data?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section
        className={cn(
          "w-full flex flex-col items-center justify-center mt-9 mb-6",
          "md:px-0 md:mt-20"
        )}
      >
        <div className="container">
          <h2
            className={cn(
              "text-xl font-bold text-foreground mb-5",
              "md:text-2xl"
            )}
          >
            Promoção exclusiva
          </h2>

          <div
            className={cn(
              "flex flex-col gap-4 items-center justify-center",
              "sm:flex-row sm:gap-8"
            )}
          >
            <Link to="/" className={cn("w-full", "sm:w-[49%]")}>
              <img
                src="src/assets/images/banner-1.webp"
                alt=""
                className="w-full h-auto rounded-xl"
              />
            </Link>

            <Link to="/" className={cn("w-full", "sm:w-[49%]")}>
              <img
                src="src/assets/images/banner-4.webp"
                alt=""
                className="w-full h-auto rounded-xl"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section
        className={cn(
          "w-full flex flex-col items-center justify-center my-8",
          "md:mt-20 md:mb-20 md:px-0"
        )}
      >
        <div className="container">
          <h2
            className={cn(
              "text-xl font-bold text-foreground mb-5",
              "md:text-2xl"
            )}
          >
            Produtos mais procurados
          </h2>

          <div
            className={cn(
              "grid grid-cols-2 gap-2",
              "sm:grid-cols-3 sm:gap-4",
              "lg:grid-cols-4 lg:gap-6"
            )}
          >
            {newProducts.isLoading
              ? Array.from({ length: 15 }).map((_, index) => (
                  <ProductCardSkeleton key={`skeleton-${index}`} />
                ))
              : newProducts.data?.data?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </section>
    </main>
  );
}
