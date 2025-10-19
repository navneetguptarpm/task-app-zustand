import { Status, TaskStore } from "@/types/task.types";
import { create } from "zustand";

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          archived: false,
          deleted: false,
        },
      ],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date() } : t
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id
          ? { ...t, deleted: true, archived: false, updatedAt: new Date() }
          : t
      ),
    })),
  permanentlyDeleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
  restoreTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, deleted: false, updatedAt: new Date() } : t
      ),
    })),
  archiveTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, archived: true, updatedAt: new Date() } : t
      ),
    })),
  unarchiveTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, archived: false, updatedAt: new Date() } : t
      ),
    })),
  moveTask: (id, newStatus: Status) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, status: newStatus, updatedAt: new Date() } : t
      ),
    })),
}));
