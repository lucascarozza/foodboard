import { ChefHat, Home, UtensilsCrossed } from "lucide-react";

import { NavLink } from "./NavLink";
import { Separator } from "../ui/Separator";
import { ThemeToggle } from "@/themes/ThemeToggle";
import { AccountMenu } from "./AccountMenu";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <ChefHat size={32} />
        <Separator orientation="vertical" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home /> Dashboard
          </NavLink>
          <NavLink to="/orders">
            <UtensilsCrossed /> Pedidos
          </NavLink>
        </nav>
        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}
