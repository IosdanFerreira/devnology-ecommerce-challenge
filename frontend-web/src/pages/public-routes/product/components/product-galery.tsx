import { useState } from "react";
import type { IProduct } from "@/interfaces/product.interface";
import { cn } from "@/lib/utils";
import "react-image-lightbox/style.css";

interface ProductGalleryProps {
  product?: IProduct | null;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const gallery = [product?.image, ...(product?.gallery || [])].filter(
    Boolean
  ) as string[];
  const [photoIndex, setPhotoIndex] = useState(0);

  if (gallery.length === 0) {
    return <div>Nenhuma imagem disponível</div>;
  }

  return (
    <div className="w-full">
      {/* Imagem principal */}
      <img
        src={gallery[photoIndex]}
        alt={product?.name}
        className="rounded-xl object-cover w-full max-h-[500px]"
      />

      {/* Miniaturas */}
      {gallery.length > 1 && (
        <div className="flex items-center gap-3 mt-4 overflow-x-auto">
          {gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setPhotoIndex(index)} // só isso
              className={cn(
                "w-20 h-20 object-cover rounded-md border cursor-pointer",
                index === photoIndex
                  ? "border-emerald-500"
                  : "border-transparent hover:border-gray-300"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
