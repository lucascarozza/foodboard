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
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
  onPageChange,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        {totalCount === 0
          ? "Não há pedidos."
          : `Total de ${totalCount} ${totalCount === 1 ? "item" : "itens"}`}
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
            variant="outline"
            size="icon"
          >
            <ChevronsLeft />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            variant="outline"
            size="icon"
          >
            <ChevronLeft />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex + 1}
            variant="outline"
            size="icon"
          >
            <ChevronRight />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            onClick={() => onPageChange(pages - 1)}
            disabled={pages <= pageIndex + 1}
            variant="outline"
            size="icon"
          >
            <ChevronsRight />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
