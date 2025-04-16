import { Skeleton } from "@/components/ui/Skeleton";

export function MetricCardSkeleton() {
  return (
    <>
      <Skeleton className="h-7 w-36 my-1" />
      <Skeleton className="h-4 w-52" />
    </>
  );
}
