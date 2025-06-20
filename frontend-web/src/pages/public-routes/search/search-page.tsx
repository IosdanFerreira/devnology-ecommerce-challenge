import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { IApiResponse } from "@/api/interface/api-response.interface";
import type { IProduct } from "@/interfaces/product.interface";
import { getAllProducts } from "@/api/modules/product/get-all-products";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductCard from "@/components/product-card";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";
import { cn } from "@/lib/utils";
import { FilterSidebarWithResponsiveDrawer } from "./components/filter-sidebar-responsive";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") ?? "";

  // Extrai filtros da URL
  function getParamsFromURL(searchParams: URLSearchParams) {
    const get = (key: string) => {
      const val = searchParams.get(key);
      return val && val !== "" ? val : null;
    };

    const hasDiscountRaw = searchParams.get("hasDiscount");
    const hasDiscount =
      hasDiscountRaw === "true"
        ? true
        : hasDiscountRaw === "false"
        ? false
        : null;

    return {
      category: get("category"),
      supplier: get("supplier"),
      material: get("material"),
      minPrice: get("minPrice"),
      maxPrice: get("maxPrice"),
      hasDiscount,
    };
  }

  const [filters, setFilters] = useState(() => getParamsFromURL(searchParams));

  // Atualiza os params na URL quando os filtros mudam
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filter) params.filter = filter;
    if (filters.category) params.category = filters.category;
    if (filters.supplier) params.supplier = filters.supplier;
    if (filters.material) params.material = filters.material;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.hasDiscount !== null)
      params.hasDiscount = filters.hasDiscount.toString();

    setSearchParams(params);
  }, [filters, filter, setSearchParams]);

  const queryParams = {
    page: 1,
    perPage: 50,
    filter,
    category: filters.category ?? undefined,
    supplier: filters.supplier ?? undefined,
    material: filters.material ?? undefined,
    minPrice: filters.minPrice ?? undefined,
    maxPrice: filters.maxPrice ?? undefined,
    hasDiscount: filters.hasDiscount !== null ? filters.hasDiscount : undefined,
  };

  const { data: products, isLoading } = useQuery<IApiResponse<IProduct[]>>({
    queryKey: ["products", queryParams],
    queryFn: () => getAllProducts(queryParams),
    enabled: true,
  });

  return (
    <main className="w-full flex px-3">
      {/* Sidebar de filtros */}
      <aside className="p-4 border-r border-gray-300 sticky top-20 hidden lg:block">
        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
        <FilterSidebarWithResponsiveDrawer
          onApplyFilters={setFilters}
          {...filters}
        />
      </aside>

      {/* Conteúdo principal - Produtos */}
      <section className="flex-grow p-6">
        <div className="w-full flex items-center justify-between">
          <Breadcrumb className="my-6 text-sm text-muted-foreground">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Busca</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <FilterSidebarWithResponsiveDrawer
            onApplyFilters={setFilters}
            {...filters}
          />
        </div>

        <h2 className="text-md text-muted-foreground mb-5">
          Resultados encontrados para{" "}
          <span className="font-semibold text-black">"{filter}"</span>
        </h2>

        <div
          className={cn(
            "grid grid-cols-2 gap-2",
            "sm:grid-cols-3 sm:gap-4",
            "lg:grid-cols-4 lg:gap-6"
          )}
        >
          {isLoading
            ? Array.from({ length: 15 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))
            : products?.data?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>
    </main>
  );
}
