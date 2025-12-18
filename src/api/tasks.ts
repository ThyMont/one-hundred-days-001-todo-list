import type { Task } from "@/types";

const STORAGE_KEY = "todo.tasks.v1";

type StoredTask = Omit<Task, "createdAt" | "conclusionDate"> & {
  createdAt: string;
  conclusionDate?: string;
};

function toStored(task: Task): StoredTask {
  return {
    ...task,
    createdAt: task.createdAt.toISOString(),
    conclusionDate: task.conclusionDate ? task.conclusionDate.toISOString() : undefined,
  };
}

function fromStored(task: StoredTask): Task {
  return {
    ...task,
    createdAt: new Date(task.createdAt),
    conclusionDate: task.conclusionDate ? new Date(task.conclusionDate) : undefined,
  };
}

function readAllStored(): StoredTask[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const data = JSON.parse(raw) as StoredTask[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeAllStored(tasks: StoredTask[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function generateId(): number {
  return Math.floor(Math.random() * 1_000_000_000);
}

export const tasksApi = {
  listTasks(): Task[] {
    return readAllStored().map(fromStored);
  },

  getTaskById(id: Task["id"]): Task | null {
    const found = readAllStored().find((t) => t.id === id);
    return found ? fromStored(found) : null;
  },

  createTask(title: string, description?: string): Task {
    const now = new Date();

    const newTask: Task = {
      id: generateId(),
      title: title.trim(),
      description: description?.trim() || "",
      createdAt: now,
      conclusionDate: undefined,
    };

    const stored = readAllStored();
    stored.unshift(toStored(newTask));
    writeAllStored(stored);

    return newTask;
  },

  updateTask(id: Task["id"], data: { title?: string; description?: string }): Task | null {
    const stored = readAllStored();
    const idx = stored.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    const current = fromStored(stored[idx]);

    const updated: Task = {
      ...current,
      title: data.title !== undefined ? data.title.trim() : current.title,
      description:
        data.description !== undefined ? data.description?.trim() ?? "" : current.description,
    };

    stored[idx] = toStored(updated);
    writeAllStored(stored);

    return updated;
  },

  deleteTask(id: Task["id"]): boolean {
    const stored = readAllStored();
    const next = stored.filter((t) => t.id !== id);

    if (next.length === stored.length) return false;

    writeAllStored(next);
    return true;
  },

  finishTask(id: Task["id"]): Task | null {
    const stored = readAllStored();
    const idx = stored.findIndex((t) => t.id === id);
    if (idx === -1) return null;

    const current = fromStored(stored[idx]);
    if (current.conclusionDate) return current;

    const updated: Task = {
      ...current,
      conclusionDate: new Date(),
    };

    stored[idx] = toStored(updated);
    writeAllStored(stored);

    return updated;
  },

  clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  },

  seedIfEmpty(seed: Array<Pick<Task, "title" | "description">>) {
    const existing = readAllStored();
    if (existing.length > 0) return;

    const now = new Date();
    const tasks: Task[] = seed.map((s, i) => ({
      id: generateId() + i,
      title: s.title.trim(),
      description: s.description?.trim() || "",
      createdAt: new Date(now.getTime() - i * 60_000),
      conclusionDate: undefined,
    }));

    writeAllStored(tasks.map(toStored));
  },
};
