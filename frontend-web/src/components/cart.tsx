import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { convertToReal } from "@/utils/convert-to-real";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Cart() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const items = useCartStore((state) => state.items);
  const increase = useCartStore((state) => state.increaseQuantity);
  const decrease = useCartStore((state) => state.decreaseQuantity);

  const total = items.reduce((acc, item) => {
    const price = getUnitPrice(item);
    return acc + price * item.quantity;
  }, 0);

  function getUnitPrice(item: (typeof items)[number]) {
    return item.product.hasDiscount
      ? item.product.price - item.product.discountValue
      : item.product.price;
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className={cn(
            "relative flex flex-col items-center justify-center text-xs text-black bg-transparent",
            "md:border border-[#cacaca] md:py-3 md:px-3 md:border-[#cacaca] md:cursor-pointer rounded-md"
          )}
        >
          <div className="flex flex-col items-center">
            <ShoppingCart
              className={cn("w-5 h-5 mb-1", "md:h-4 md:w-4 md:mb-0")}
            />
            <span className="absolute right-2 md:right-0 top-0 translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full h-4 w-4 text-[11px] bg-red-400 text-white">
              {items.length}
            </span>
            <span className="text-xs md:hidden">Carrinho</span>
          </div>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md h-full flex flex-col">
          <DrawerHeader>
            <DrawerTitle>Seu carrinho</DrawerTitle>
            <DrawerDescription>
              Confira os produtos que você adicionou.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Seu carrinho está vazio.
              </p>
            ) : (
              items.map((item) => {
                const unitPrice = getUnitPrice(item);

                return (
                  <div
                    key={item.product.id}
                    className="flex flex-col sm:flex-row sm:items-start gap-3 border-b pb-4"
                  >
                    {/* Imagem do produto */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md border shrink-0"
                    />

                    {/* Informações e controle */}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div className="flex flex-col gap-1">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-medium hover:underline text-sm truncate"
                          title={item.product.name}
                          onClick={() => setOpen(false)}
                        >
                          {item.product.name}
                        </Link>

                        <div className="text-sm text-muted-foreground">
                          {item.product.hasDiscount ? (
                            <div className="flex gap-2 items-center">
                              <span className="line-through text-xs text-muted-foreground">
                                {convertToReal(item.product.price)}
                              </span>
                              <span className="text-green-600 font-semibold">
                                {convertToReal(unitPrice)}
                              </span>
                            </div>
                          ) : (
                            <span>{convertToReal(item.product.price)}</span>
                          )}
                        </div>
                      </div>

                      {/* Botões de quantidade + total */}
                      <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => decrease(item.product.id)}
                            className="cursor-pointer"
                          >
                            -
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => increase(item.product.id)}
                            className="cursor-pointer"
                          >
                            +
                          </Button>
                        </div>
                        <p className="font-semibold text-sm">
                          {convertToReal(unitPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <DrawerFooter className="border-t">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total:</span>
              <span className="text-lg font-semibold">
                {convertToReal(total)}
              </span>
            </div>

            <Button
              disabled={items.length === 0}
              onClick={() => {
                navigate(isAuthenticated ? "/checkout" : "/login");
                setOpen(false);
              }}
              className="cursor-pointer"
            >
              Finalizar Compra
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Fechar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
