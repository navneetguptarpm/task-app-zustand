export type Priority = "low" | "medium" | "high";

export type Status = "new" | "in-progress" | "review" | "completed";

export type eCreate = "id" | "createdAt" | "updatedAt" | "archived" | "deleted";

export type eUpdate = "id" | "createdAt";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  deleted: boolean;
}

export interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, eCreate>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, eUpdate>>) => void;
  deleteTask: (id: string) => void;
  permanentlyDeleteTask: (id: string) => void;
  restoreTask: (id: string) => void;
  archiveTask: (id: string) => void;
  unarchiveTask: (id: string) => void;
  moveTask: (id: string, newStatus: Status) => void;
}
