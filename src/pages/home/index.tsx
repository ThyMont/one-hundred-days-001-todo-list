import { FormButton } from "@/components/FormButton";
import TaskCard from "@/components/TaskCard";
import { Layout } from "@/pages/layout";
import type { Task } from "@/types";
import { tasksApi } from "@/api/tasks";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(tasksApi.listTasks());
  }, []);

  function handleSave(title: string, description: string) {
    const created = tasksApi.createTask(title, description);
    setTasks((prev) => [created, ...prev]);
  }

  function handleUpdate(taskId: Task["id"], title: string, description: string) {
    const updated = tasksApi.updateTask(taskId, { title, description });
    if (!updated) return;

    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)));
  }

  function handleFinish(task: Task) {
    const finished = tasksApi.finishTask(task.id);
    if (!finished) return;

    setTasks((prev) => prev.map((t) => (t.id === task.id ? finished : t)));
  }

  function handleDelete(task: Task) {
    const ok = tasksApi.deleteTask(task.id);
    if (!ok) return;

    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  }

  const hasTasks = tasks.length > 0;

  return (
    <Layout>
      <Box justifyContent="flex-end" display="flex" mb="3">
        <FormButton onSave={handleSave} />
      </Box>

      {hasTasks ? (
        <Box display="flex" flexDirection="column" gap="3">
          {tasks.map((t) => (
            <TaskCard
              key={t.id}
              task={t}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onFinish={handleFinish}
            />
          ))}
        </Box>
      ) : (
        <Box
          bg="bg.subtle"
          borderWidth="1px"
          borderColor="border"
          borderRadius="lg"
          p="8"
          textAlign="center"
        >
          <Text color="fg" fontWeight="semibold">
            No tasks yet
          </Text>
          <Text mt="1" color="fg.muted" fontSize="sm">
            Click “New Task” to create your first one.
          </Text>
        </Box>
      )}
    </Layout>
  );
}
