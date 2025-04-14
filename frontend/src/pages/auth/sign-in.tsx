import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

const signInFormSchema = z.object({
  email: z.string().email("Email inválido"),
});

type SignInForm = z.infer<typeof signInFormSchema>;

export function SignIn() {
  const [searchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email });
      toast.success("Enviamos um link de login para o seu e-mail.");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar o link de login.");
    }
  }

  return (
    <div className="p-8">
      <Button
        asChild
        variant="link"
        className="cursor-pointer absolute top-8 right-8"
      >
        <Link to="/sign-up">Novo restaurante</Link>
      </Button>

      <div className="flex flex-col justify-center gap-6 w-80">
        <header className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar painel
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas vendas pelo painel do parceiro.
          </p>
        </header>

        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="cursor-text"
            />
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            Acessar painel
          </Button>
        </form>
      </div>
    </div>
  );
}
