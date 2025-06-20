import type { IProduct } from "@/interfaces/product.interface";
import { convertToReal } from "@/utils/convert-to-real";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const finalPrice = product.hasDiscount
    ? product.price - product.discountValue
    : product.price;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group border rounded-xl shadow-sm overflow-hidden bg-white flex flex-col transition-transform"
    >
      {/* Imagem responsiva */}
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={product.image || product.gallery?.[0]}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        {/* Nome */}
        <h3 className="text-sm sm:text-lg font-semibold line-clamp-1 group-hover:underline">
          {product.name}
        </h3>

        {/* Descrição */}
        <p className="text-muted-foreground text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Preço e botão */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="text-sm sm:text-base font-bold text-foreground">
            {product.hasDiscount ? (
              <>
                <span className="line-through text-xs sm:text-sm mr-1 text-red-300">
                  {convertToReal(product.price)}
                </span>
                <span className="text-green-600">
                  {convertToReal(finalPrice)}
                </span>
              </>
            ) : (
              <span>{convertToReal(product.price)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
