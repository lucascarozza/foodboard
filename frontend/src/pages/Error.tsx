import { Link } from "react-router-dom";

export function Error() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Oops! Algo deu errado...</h1>
      <p className="text-accent-foreground">
        Um erro aconteceu na aplicação. Tente novamente mais tarde.
      </p>
      <span className="flex gap-1.5">
        <p className="text-accent-foreground">Voltar para o</p>
        <Link
          to="/"
          className="text-sky-500 dark:text-sky-400 underline cursor-pointer"
        >
          Dashboard
        </Link>
      </span>
    </div>
  );
}
