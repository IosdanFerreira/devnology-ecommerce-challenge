import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/lib/axios";
import { convertToReal } from "@/utils/convert-to-real";
import { useAuth } from "@/context/auth-context";
import type { Order, orderedProduct } from "@/interfaces/order.interface";
import { Link } from "react-router-dom";
import { Loading } from "@/components/layouts/loading";
import { Empty } from "@/components/layouts/empty";
import { Separator } from "@/components/ui/separator";

export default function MyOrdersPage() {
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery<Order[]>({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await api.get("/order");
      return res.data.data;
    },
    enabled: !!user,
  });

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data || data.length === 0) {
    return <Empty text="Você ainda não fez nenhum pedido." />;
  }

  return (
    <main className="w-full flex min-h-[70vh] flex-col items-center px-3 py-10 bg-[#F9F9F9]">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Meus pedidos</h2>

        <div className="space-y-8">
          {data.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 bg-white shadow-sm space-y-4"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">Pedido #{order.id}</p>
                  <p className=" text-muted-foreground">
                    Status: <span className="capitalize">{order.status}</span>
                  </p>
                </div>
                <p className="font-semibold">
                  Total: {convertToReal(order.totalAmount)}
                </p>
              </div>

              <div className="flex flex-col gap-8">
                {order?.products?.map((item: orderedProduct, index: number) => (
                  <div key={index}>
                    <Link
                      to={`/product/${item?.product?.id}`}
                      className="flex gap-4 group"
                    >
                      <img
                        src={item?.product?.image}
                        alt={item?.product?.name}
                        className="w-24 h-24 rounded object-cover border"
                      />

                      <div className="flex flex-col justify-between">
                        <p className="font-medium group-hover:underline">
                          {item.product?.name}
                        </p>
                        <p className="text-muted-foreground mb-3">
                          {item.product?.description}
                        </p>
                        <p className="text">
                          <span className="font-semibold mr-1">
                            Quantidade:
                          </span>
                          {item.quantity}
                        </p>
                        <p className="text">
                          <span className="font-semibold mr-1">
                            Preço unitário:
                          </span>
                          {convertToReal(item.product?.price)}
                        </p>
                      </div>
                    </Link>
                    <Separator className="w-full mt-5" />
                  </div>
                ))}
              </div>

              <div className="text-md text-muted-foreground">
                <span className="font-semibold text-black mr-1">
                  Data do pedido:
                </span>
                {new Date(order.createdAt).toLocaleDateString("pt-BR")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
