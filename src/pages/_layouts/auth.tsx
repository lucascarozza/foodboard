import { ChefHat } from "lucide-react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
        <div className="flex items-center gap-2 text-foreground">
          <ChefHat size={32} />
          <span className="text-3xl font-semibold">Foodboard</span>
        </div>
        <footer className="text-sm">
          &copy; {new Date().getFullYear()} Foodboard
        </footer>
      </div>

      <div className="relative flex items-center justify-center flex-coll">
        <Outlet />
      </div>
    </main>
  );
}