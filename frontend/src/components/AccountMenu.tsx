// External libraries
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Internal utilities
import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";

// UI components
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import { Skeleton } from "./ui/Skeleton";
import { Dialog, DialogTrigger } from "./ui/Dialog";
import { RestaurantProfileDialog } from "./RestaurantProfileDialog";
import { signOut } from "@/api/sign-out";

export function AccountMenu() {
  const navigate = useNavigate();

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: Infinity,
  });

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ["managed-restaurant"],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
    });

  const { mutateAsync: signOutFn, isPending: isSigningOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate("/sign-in", { replace: true });
    },
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <ChevronDown />
            {isLoadingManagedRestaurant ? (
              <Skeleton className="w-40 h-4" />
            ) : (
              managedRestaurant?.name
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="w-32 h-4" />
                <Skeleton className="w-24 h-3" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xm font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem className="h-9 cursor-pointer">
              <Building />
              <span className="leading-0 cursor-pointer">Perfil da Loja</span>
            </DropdownMenuItem>
          </DialogTrigger>

          <DropdownMenuItem
            asChild
            disabled={isSigningOut}
            className="h-9 text-rose-500 dark:text-rose-400 cursor-pointer"
          >
            <button onClick={() => signOutFn()} className="w-full">
              <LogOut className="text-rose-500 dark:text-rose-400" />
              <span className="leading-0 cursor-pointer">Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RestaurantProfileDialog />
    </Dialog>
  );
}
