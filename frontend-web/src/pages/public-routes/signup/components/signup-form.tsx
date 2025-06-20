import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/input-password";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterForm() {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;

  const formSchema = z
    .object({
      name: z
        .string()
        .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
      email: z.string().email({ message: "Insira um email válido" }),

      password: z.string().regex(passwordRegex, {
        message:
          "A senha deve conter 8 caracteres, pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
      }),
      confirm_password: z.string(),
      privacy_consent: z.boolean().refine((val) => val === true, {
        message: "Você precisa aceitar os termos de privacidade.",
      }),
      role_id: z.number(),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "As senhas devem ser iguais",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      privacy_consent: false,
      role_id: 2,
    },
    shouldUnregister: false,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Aqui você deve implementar a chamada para a API de registro
      console.log(values);
    } catch {
      // Não resetar o formulário em caso de erro
      return;
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Last Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              const showError =
                form.formState.errors.name && form.formState.isSubmitted;

              return (
                <FormItem>
                  <FormLabel
                    className={cn(showError ? "text-destructive" : "")}
                  >
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira seu sobrenome"
                      className={cn(
                        "py-6 w-full",
                        showError ? "text-destructive" : ""
                      )}
                      {...field}
                    />
                  </FormControl>
                  {form.formState.isSubmitted && <FormMessage />}
                </FormItem>
              );
            }}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              const showError =
                form.formState.errors.email && form.formState.isSubmitted;

              return (
                <FormItem>
                  <FormLabel
                    className={cn(showError ? "text-destructive" : "")}
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira seu email"
                      className={cn(
                        "py-6",
                        showError ? "text-destructive" : ""
                      )}
                      {...field}
                    />
                  </FormControl>
                  {form.formState.isSubmitted && <FormMessage />}
                </FormItem>
              );
            }}
          />

          {/* Senha */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              const showError =
                form.formState.errors.password && form.formState.isSubmitted;

              return (
                <FormItem>
                  <FormLabel
                    className={cn(showError ? "text-destructive" : "")}
                  >
                    Senha
                  </FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="Insira sua senha"
                      className={cn(
                        "py-6",
                        showError ? "text-destructive" : ""
                      )}
                      {...field}
                    />
                  </FormControl>
                  {form.formState.isSubmitted && <FormMessage />}
                </FormItem>
              );
            }}
          />

          {/* Confirmar Senha */}
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => {
              const showError =
                form.formState.errors.confirm_password &&
                form.formState.isSubmitted;

              return (
                <FormItem>
                  <FormLabel
                    className={cn(showError ? "text-destructive" : "")}
                  >
                    Confirmar senha
                  </FormLabel>
                  <FormControl>
                    <InputPassword
                      placeholder="Digite novamente sua senha"
                      className={cn(
                        "py-6",
                        showError ? "text-destructive" : ""
                      )}
                      {...field}
                    />
                  </FormControl>
                  {form.formState.isSubmitted && <FormMessage />}
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="privacy_consent"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col space-x-2">
                  <div>
                    <Checkbox
                      id="privacy_consent"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mr-2"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
                    >
                      Ao criar uma conta, você concorda com nossos
                      <Link
                        to={"/"}
                        className="font-semibold underline text-primary ml-1"
                      >
                        Termos e Condições e Política de Privacidade
                      </Link>
                    </label>
                  </div>
                  {form.formState.isSubmitted && <FormMessage />}
                </FormItem>
              );
            }}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer text-md py-6 text-xl"
          >
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
