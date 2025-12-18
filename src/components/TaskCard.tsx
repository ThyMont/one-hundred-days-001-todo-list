import type { Task } from "@/types";
import { FormButton } from "@/components/FormButton";
import { Box, Button, Card, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { LuCheck } from "react-icons/lu";
import { MdCheckCircle } from "react-icons/md";
import { Tooltip } from "@/components/ui/tooltip";

interface TaskCardProps {
  task: Task;
  onUpdate: (taskId: Task["id"], title: string, description: string) => void;
  onDelete?: (task: Task) => void;
  onFinish?: (task: Task) => void;
}

export default function TaskCard({ task, onUpdate, onDelete, onFinish }: TaskCardProps) {
  const isFinished = Boolean(task.conclusionDate);

  const actionBtnProps = {
    variant: "ghost" as const,
    size: "sm" as const,
    borderWidth: "1px",
    borderColor: "border",
    bg: "transparent",
    _hover: { bg: "bg.subtle" },
    _active: { bg: "bg.muted" },
  };

  return (
    <Card.Root bg="surface" borderWidth="1px" borderColor="border" borderRadius="lg">
      <Card.Body>
        <Flex align="start" justify="space-between" gap="3">
          <Box>
            <Text
              fontWeight="semibold"
              color={isFinished ? "fg.muted" : "fg"}
              textDecoration={isFinished ? "line-through" : "none"}
              lineHeight="1.2"
            >
              {task.title}
            </Text>

            {task.description ? (
              <Text mt="2" color="fg.muted" fontSize="sm">
                {task.description}
              </Text>
            ) : (
              <Text mt="2" color="fg.subtle" fontSize="sm">
                Sem descrição
              </Text>
            )}
          </Box>

          <Stack direction="row" gap="2" align="center">
            {!isFinished ? (
              <Tooltip content="Finish task">
                <Button
                  {...actionBtnProps}
                  aria-label="Finish task"
                  onClick={() => onFinish?.(task)}
                  color="success"
                >
                  <Icon as={LuCheck} fontSize="lg" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip content="Task finished">
                <Icon as={MdCheckCircle} color="success" fontSize="xl" />
              </Tooltip>
            )}

            <FormButton
              onSave={(title, description) => onUpdate(task.id, title, description)}
              initialTitle={task.title}
              initialDescription={task.description ?? ""}
              triggerVariant="ghost"
            />

            <Tooltip content="Delete task">
              <Button
                {...actionBtnProps}
                aria-label="Delete task"
                onClick={() => onDelete?.(task)}
                color="danger"
              >
                <Icon as={FiTrash2} fontSize="lg" />
              </Button>
            </Tooltip>
          </Stack>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}
