// External libraries
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Internal utilities
import {
  GetManagedRestaurantResponse,
  getManagedRestaurant,
} from "@/api/get-managed-restaurant";

// UI components
import { Button } from "../ui/Button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/TextArea";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

// Schema definition
const restaurantProfileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." })
    .max(30, { message: "O nome deve ter no máximo 30 caracteres." }),
  description: z
    .string()
    .max(200, {
      message: "A descrição deve ter no máximo 200 caracteres.",
    })
    .nullable(),
});

type RestaurantProfileSchema = z.infer<typeof restaurantProfileSchema>;

export function RestaurantProfileDialog() {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RestaurantProfileSchema>({
    resolver: zodResolver(restaurantProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  function updateManagedRestaurantCache({
    name,
    description,
  }: RestaurantProfileSchema) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      "managed-restaurant",
    ]);

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(["managed-restaurant"], {
        ...cached,
        name,
        description,
      });
    }

    return { cached };
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description });
      return { previousProfile: cached };
    },
    onError(_error, _variables, context) {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile);
      }
    }
  });

  async function handleUpdateProfile(data: RestaurantProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      });
      toast.success("Restaurante atualizado com sucesso!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        "Ocorreu um erro ao atualizar o restaurante. Tente novamente mais tarde."
      );
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu restaurante.
        </DialogDescription>
      </DialogHeader>

      <form className="space-y-4" onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="restaurantName">Nome do Restaurante</Label>
            <Input
              id="restaurantName"
              className="w-full cursor-text"
              {...register("name")}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              className="w-full h-32 cursor-text"
              {...register("description")}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
