"use client";

import AddTaskDialog from "@/components/tasks/AddTaskDialog";
import StatusColumn from "@/components/tasks/StatusColumn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statusLabels } from "@/lib/statics";
import { useTaskStore } from "@/lib/stores/task.stores";
import { truncateText } from "@/lib/utils";
import { Status } from "@/types/task.types";
import { Archive, ArchiveRestore, Trash2 } from "lucide-react";
import { useState } from "react";

export default function App() {
  const tasks = useTaskStore((s) => s.tasks);
  const {
    unarchiveTask,
    deleteTask,
    permanentlyDeleteTask,
    restoreTask,
    moveTask,
  } = useTaskStore();
  const activeTasks = tasks.filter((t) => !t.deleted && !t.archived);
  const archivedTasks = tasks.filter((t) => t.archived && !t.deleted);
  const deletedTasks = tasks.filter((t) => t.deleted);
  const [showArchived, setShowArchived] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Task App</h1>
            <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant={showTrash ? "default" : "outline"}
              onClick={() => {
                setShowTrash(!showTrash);
                setShowArchived(false);
              }}
            >
              {showTrash ? "Show Active" : `Trash (${deletedTasks.length})`}
            </Button>
            <Button
              variant={showArchived ? "default" : "outline"}
              onClick={() => {
                setShowArchived(!showArchived);
                setShowTrash(false);
              }}
            >
              {showArchived
                ? "Show Active"
                : `Archived (${archivedTasks.length})`}
            </Button>
            <AddTaskDialog />
          </div>
        </div>

        {showTrash ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trash2 className="w-5 h-5" /> Trash
              </CardTitle>
            </CardHeader>
            <CardContent>
              {deletedTasks.length === 0 ? (
                <p className="text-gray-400 text-center py-8">Trash is empty</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {deletedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-red-50 p-3 rounded-lg border border-red-200"
                    >
                      <h4 className="font-semibold text-sm mb-2">
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-3">
                        {truncateText(task.description, 60)}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => restoreTask(task.id)}
                        >
                          <ArchiveRestore className="w-3 h-3 mr-1" /> Restore
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => permanentlyDeleteTask(task.id)}
                        >
                          <Trash2 className="w-3 h-3 mr-1" /> Delete Forever
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : showArchived ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="w-5 h-5" /> Archived Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {archivedTasks.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No archived tasks
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {archivedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                    >
                      <h4 className="font-semibold text-sm mb-2">
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-3">
                        {truncateText(task.description, 60)}
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => unarchiveTask(task.id)}
                        >
                          <ArchiveRestore className="w-3 h-3 mr-1" /> Unarchive
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => deleteTask(task.id)}
                        >
                          <Trash2 className="w-3 h-3 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {Object.entries(statusLabels).map(([status, title]) => (
              <StatusColumn
                key={status}
                status={status as Status}
                title={title}
                tasks={activeTasks.filter((t) => t.status === status)}
                onTaskMove={moveTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
