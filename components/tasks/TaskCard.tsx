import { cn, formatDate, truncateText } from "@/lib/utils";
import PriorityBadge from "@/PriorityBadge";
import TaskDetailDialog from "@/TaskDetailDialog";
import { Task } from "@/types/task.types";
import { Button } from "@/ui/button";
import { Archive, GripVertical, Trash2 } from "lucide-react";
import { useState } from "react";

export default function TaskCard({
  task,
  onDelete,
  onArchive,
  onDragStart,
  draggable = true,
}: {
  task: Task;
  onDelete: () => void;
  onArchive?: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  draggable?: boolean;
}) {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
      <div
        draggable={draggable}
        onDragStart={onDragStart}
        onClick={() => setDetailOpen(true)}
        className={cn(
          "bg-white p-3 rounded-lg shadow-sm border border-gray-200 select-none",
          draggable && "hover:shadow-md cursor-pointer transition-shadow"
        )}
      >
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-2 flex-1">
            {draggable && (
              <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
            )}
            <h4 className="font-semibold text-sm break-words">{task.title}</h4>
          </div>
          <PriorityBadge priority={task.priority} />
        </div>

        {task.description && (
          <p className="text-xs text-gray-600 mb-2 break-words">
            {truncateText(task.description, 80)}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {formatDate(task.createdAt)}
          </span>
          <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
            {onArchive && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive();
                }}
                className="h-7 px-2 text-xs"
              >
                <Archive className="w-3 h-3" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      <TaskDetailDialog
        task={task}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </>
  );
}
