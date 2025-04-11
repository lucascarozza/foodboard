import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/Button";

interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
}

export function Pagination(props: PaginationProps) {
  const pages = Math.ceil(props.totalCount / props.perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        {props.totalCount === 0
          ? "Não há pedidos."
          : `Total de ${props.totalCount} ${
              props.totalCount === 1 ? "item" : "itens"
            }`}
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {props.pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronsLeft />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button variant="outline" size="icon">
            <ChevronLeft />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button variant="outline" size="icon">
            <ChevronsRight />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
