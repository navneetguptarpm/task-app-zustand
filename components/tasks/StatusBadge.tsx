import { statusColors, statusLabels } from "@/lib/statics";
import { cn } from "@/lib/utils";
import { Status } from "@/types/task.types";
import { Badge } from "@/ui/badge";

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge
      variant={"outline"}
      className={cn(statusColors[status], "text-xs px-2 py-0")}
    >
      {statusLabels[status]}
    </Badge>
  );
}
