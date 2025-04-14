import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-restaurant";

const signUpFormSchema = z.object({
  restaurantName: z
    .string()
    .min(
      3,
      "O nome do restaurante é obrigatório e deve ter no mínimo 3 caracteres"
    )
    .max(30, { message: "O nome deve ter no máximo 30 caracteres." }),
  managerName: z
    .string()
    .min(
      3,
      "O nome do responsável é obrigatório e deve ter no mínimo 3 caracteres."
    )
    .max(30, { message: "O nome do responsável deve ter no máximo 30 caracteres." }),
  phone: z
    .string()
    .min(10, "Telefone é obrigatório e deve ter no mínimo 8 dígitos"),
  email: z.string().email("Email inválido"),
});

type SignUpForm = z.infer<typeof signUpFormSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { mutateAsync: newRestaurant } = useMutation({
    mutationFn: registerRestaurant,
  });

  async function handleSignUp(data: SignUpForm) {
    try {
      await newRestaurant({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone,
      });
      toast.success("Conta criada com sucesso!", {
        action: {
          label: "Acessar painel",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível criar sua conta.");
    }
  }

  return (
    <div className="p-8">
      <Button
        asChild
        variant="link"
        className="cursor-pointer absolute top-8 right-8"
      >
        <Link to="/sign-in">Fazer Log In</Link>
      </Button>
      <div className="flex flex-col justify-center gap-6 w-80">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro e gerencie os pedidos do seu restaurante agora
            mesmo.
          </p>
        </header>

        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="restaurantName">Nome do restaurante</Label>
            <Input
              id="restaurantName"
              type="text"
              {...register("restaurantName")}
              className="cursor-text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Nome do responsável</Label>
            <Input
              id="managerName"
              type="text"
              {...register("managerName")}
              className="cursor-text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="cursor-text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              className="cursor-text"
            />
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            Finalizar cadastro
          </Button>

          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar, você concorda com os nossos{" "}
            <a href="" className="cursor-pointer underline">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="" className="cursor-pointer underline">
              Política de Privacidade
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
