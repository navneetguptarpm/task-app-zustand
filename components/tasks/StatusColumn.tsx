import { useTaskStore } from "@/lib/stores/task.stores";
import { cn } from "@/lib/utils";
import { Status, Task } from "@/types/task.types";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TaskCard from "./TaskCard";

export default function StatusColumn({
  status,
  title,
  tasks,
  onTaskMove,
}: {
  status: Status;
  title: string;
  tasks: Task[];
  onTaskMove: (id: string, newStatus: Status) => void;
}) {
  const { deleteTask, archiveTask } = useTaskStore();
  const [draggedOver, setDraggedOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget === e.target) setDraggedOver(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(false);
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) onTaskMove(taskId, status);
  };
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  return (
    <div
      className="flex-shrink-0 w-[280px]"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Card className={cn(draggedOver && "ring-2 ring-blue-400")}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span>{title}</span>
            <Badge variant="secondary" className="text-xs">
              {tasks.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto">
          {tasks.length === 0 ? (
            <div className="text-sm text-center py-8 text-gray-400 border border-dashed border-gray-200 rounded-lg">
              No tasks
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                draggable
                onDelete={() => deleteTask(task.id)}
                onArchive={() => archiveTask(task.id)}
                onDragStart={(e) => handleDragStart(e, task.id)}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
