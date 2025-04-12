import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";

export function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer flex select-none items-center gap-2"
        >
          <ChevronDown />
          Restaurante
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span>Lucas Carozza</span>
          <span className="text-muted-foreground text-xm font-normal">
            contact@lucascarozza.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-9 cursor-pointer">
          <Building />
          <span className="cursor-pointer leading-0">Perfil da Loja</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="h-9 cursor-pointer text-rose-500 dark:text-rose-400">
          <LogOut className="text-rose-500 dark:text-rose-400" />
          <span className="cursor-pointer leading-0">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}