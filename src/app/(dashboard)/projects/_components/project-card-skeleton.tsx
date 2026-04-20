import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

export function ProjectCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-8" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-2 w-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="pt-2 border-t">
          <Skeleton className="h-3 w-1/4" />
        </div>
      </CardContent>
    </Card>
  );
}
