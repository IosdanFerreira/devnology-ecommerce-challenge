import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { IProduct } from "@/interfaces/product.interface";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductGalleryProps {
  product?: IProduct | null;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const gallery = [product?.image, ...(product?.gallery || [])].filter(Boolean);

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <img
            src={selectedImage || gallery[0]}
            alt={product?.name}
            className="rounded-xl object-cover w-full max-h-[500px] cursor-zoom-in"
          />
        </DialogTrigger>
        <DialogContent className="max-w-3xl p-0 bg-transparent border-none">
          <img
            src={selectedImage || gallery[0]}
            alt={product?.name}
            className="w-full h-auto rounded-xl"
          />
        </DialogContent>
      </Dialog>

      {gallery.length > 1 && (
        <div className="flex items-center gap-3 mt-4 overflow-x-auto">
          {gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => img && setSelectedImage(img)}
              className={cn(
                "w-20 h-20 object-cover rounded-md border cursor-pointer",
                img === selectedImage
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
