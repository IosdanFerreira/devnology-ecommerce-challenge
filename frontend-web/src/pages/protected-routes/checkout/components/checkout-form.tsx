import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const checkoutSchema = z.object({
  customer: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(8, "Telefone obrigatório"),
  cep: z.string().min(8, "CEP obrigatório"),
  street: z.string().min(3, "Rua obrigatória"),
  number: z.string().min(1, "Número obrigatório"),
  neighborhood: z.string().min(2, "Bairro obrigatório"),
  city: z.string().min(2, "Cidade obrigatória"),
  state: z.string().min(2, "Estado obrigatório"),
  complement: z.string().optional(),
  paymentMethod: z.enum(["creditCard", "boleto", "pix"], {
    required_error: "Selecione o método de pagamento",
  }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
});

type CheckoutSchema = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const navigate = useNavigate();
  const {
    getTotalPrice: geCartTotalPrice,
    items: products,
    clearCart,
  } = useCartStore();

  const form = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customer: "",
      email: "",
      phone: "",
      cep: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      complement: "",
      paymentMethod: "creditCard",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const handleSubmit: SubmitHandler<CheckoutSchema> = (data) => {
    const formattedAddressValue = `${data.street}, ${data.number}, ${data.complement}, ${data.neighborhood}, ${data.city}, ${data.state}`;

    const formattedInput = {
      customer: data.customer,
      email: data.email,
      phone: data.phone,
      address: formattedAddressValue,
      products: products,
      totalAmount: geCartTotalPrice(),
      paymentMethod: data.paymentMethod,
      paymentId: uuidv4(),
    };

    console.log("Pedido:", formattedInput);
    // clearCart();
    // navigate("/checkout/success");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn(
          "w-full lg:w-[25vw] space-y-5 border border-[#e6e6e6] rounded-md p-6 lg:mx-15 bg-white"
        )}
      >
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">
            Finalize sua compra
          </h2>

          <p className="text-muted-foreground">
            Preencha os dados abaixo para finalizar sua compra, lembre-se de
            conferir os dados antes de confirmar.
          </p>
        </div>

        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nome completo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="exemplo@email.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="(xx) xxxxx-xxxx" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input {...field} placeholder="00000-000" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rua</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Rua Exemplo" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="123" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bairro</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Bairro" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Cidade" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="UF" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Apartamento, bloco..." />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Método de Pagamento</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creditCard">
                      Cartão de Crédito
                    </SelectItem>
                    <SelectItem value="boleto">Boleto Bancário</SelectItem>
                    <SelectItem value="pix">Pix</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {paymentMethod === "creditCard" && (
          <>
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do Cartão</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0000 0000 0000 0000" />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="cardExpiry"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Validade</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="MM/AA" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardCvv"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        {paymentMethod === "boleto" && (
          <div className="text-sm text-muted-foreground">
            Um boleto será gerado após a finalização do pedido.
          </div>
        )}

        {paymentMethod === "pix" && (
          <div className="text-sm text-muted-foreground">
            Um QR Code Pix será gerado após a finalização do pedido.
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-emerald-600 text-white hover:bg-zinc-800 cursor-pointer py-6"
        >
          Finalizar Pedido
        </Button>
      </form>
    </FormProvider>
  );
}
