import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/themes/ThemeProvider";

export function App() {
  return (
    <ThemeProvider storageKey="foodboard-theme" defaultTheme="system">
      <Toaster richColors />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
