import { Button, Field, Input, Popover, Portal, Stack, Textarea, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";

interface Props {
  onSave: (title: string, description: string) => void;

  // Se vier preenchido, o componente entra em "edit mode"
  initialTitle?: string;
  initialDescription?: string;

  // Opcional: customizar label do botão no modo create
  createLabel?: string;
}

export function FormButton({
  onSave,
  initialTitle,
  initialDescription,
  createLabel = "New Task",
}: Props) {
  const isEditMode = initialTitle !== undefined || initialDescription !== undefined;

  const [title, setTitle] = useState(initialTitle ?? "");
  const [description, setDescription] = useState(initialDescription ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTitle(initialTitle ?? "");
    setDescription(initialDescription ?? "");
  }, [open, initialTitle, initialDescription]);

  function handleSave() {
    onSave(title.trim(), description.trim());
    setOpen(false);
  }

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        {isEditMode ? (
          <Button variant="outline" size="sm" aria-label="Edit task">
            <Icon as={FiEdit2} />
          </Button>
        ) : (
          <Button size="sm">{createLabel}</Button>
        )}
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content
            bg="surface"
            color="fg"
            borderWidth="1px"
            borderColor="border"
            boxShadow="lg"
          >
            <Popover.Arrow />
            <Popover.Body>
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>Title</Field.Label>
                  <Input
                    placeholder="ex: Clean the house"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Textarea
                    placeholder="(Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Field.Root>

                <Button size="sm" onClick={handleSave} disabled={!title.trim()}>
                  Save
                </Button>
              </Stack>
            </Popover.Body>

            <Popover.CloseTrigger />
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
