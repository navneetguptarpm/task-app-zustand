import { priorityColors, priorityLabels } from "@/lib/statics";
import { cn } from "@/lib/utils";
import { Priority } from "@/types/task.types";
import { Badge } from "@/ui/badge";

export default function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge
      variant={"outline"}
      className={cn(priorityColors[priority], "text-xs px-2 py-0")}
    >
      {priorityLabels[priority]}
    </Badge>
  );
}
