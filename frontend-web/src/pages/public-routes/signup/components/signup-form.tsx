/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Signup, type SignupDTO } from "@/api/modules/user/signup";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export function RegisterForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
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
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "As senhas devem ser iguais",
      path: ["confirm_password"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      privacy_consent: false,
    },
    shouldUnregister: false,
  });

  const signupMutate = useMutation({
    mutationFn: (data: SignupDTO) => Signup(data),
    onSuccess: () => {
      // ex: navegação após sucesso
      toast.success("Cadastro realizado!");
      login({
        email: form.getValues("email"),
        password: form.getValues("password"),
      });
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    signupMutate.mutate({
      name: values.name,
      email: values.email,
      phone: "(11) 99999-9999",
      password: values.confirm_password,
      privacy_consent: values.privacy_consent,
    });
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

          {signupMutate?.error && (
            <Alert className="text-destructive border-destructive bg-destructive/10">
              <TriangleAlert />
              <AlertTitle className="font-bold">
                Oops, algo deu errado!
              </AlertTitle>
              <AlertDescription className="text-destructive">
                {signupMutate?.error?.response?.data?.errors?.map(
                  (error: any) => error.message
                )}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full cursor-pointer text-md py-6 text-xl"
          >
            Realizar cadastro
          </Button>
        </form>
      </Form>
    </div>
  );
}
