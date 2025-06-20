import { useCartStore } from "@/store/cart-store";
import { CheckoutForm } from "./components/checkout-form";
import { Link } from "react-router-dom";
import { convertToReal } from "@/utils/convert-to-real";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function CheckoutPage() {
  const {
    increaseQuantity,
    decreaseQuantity,
    items: products,
    removeItem,
    getTotalPrice,
  } = useCartStore();

  function getUnitPrice(item: (typeof products)[number]) {
    return item.product.hasDiscount
      ? item.product.price - item.product.discountValue
      : item.product.price;
  }

  return (
    <main className="w-full min-h-[70vh] flex flex-col items-center justify-center px-3 bg-[#F9F9F9]">
      <div className="container flex flex-col md:flex-row gap-8 py-4 lg:py-10">
        <div className="lg:w-[60vw] flex flex-col">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Seu carrinho</h2>
            <p className="text-muted-foreground">
              Confira os produtos que você adicionou.
            </p>
          </div>

          <div className="space-y-4 overflow-y-auto flex-1">
            {products.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Seu carrinho está vazio.
              </p>
            ) : (
              products.map((item) => {
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
                      className="w-40 h-40 object-cover rounded-md border shrink-0"
                    />

                    {/* Informações e controle */}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div className="flex flex-col gap-1">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="font-medium hover:underline text-md truncate"
                          title={item.product.name}
                        >
                          {item.product.name}
                        </Link>

                        <p className="text-sm text-[#4d4d4d]">
                          {item.product.description}
                        </p>

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
                            onClick={() => decreaseQuantity(item.product.id)}
                            className="cursor-pointer"
                          >
                            -
                          </Button>
                          <span className="text-sm">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => increaseQuantity(item.product.id)}
                            className="cursor-pointer"
                          >
                            +
                          </Button>
                        </div>
                        <p className="font-semibold text-sm">
                          {convertToReal(unitPrice * item.quantity)}
                        </p>
                      </div>

                      <Button
                        variant="destructive"
                        className="flex items-center justify-self-start w-fit bg-red-500 hover:bg-red-400 mt-2 cursor-pointer"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash className="h-4 w-4" />
                        Remover produto
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Total:</span>
              <span className="text-lg font-semibold">
                {convertToReal(getTotalPrice())}
              </span>
            </div>
          </div>
        </div>

        <div>
          <CheckoutForm />
        </div>
      </div>
    </main>
  );
}
