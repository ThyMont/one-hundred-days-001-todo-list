import { Button, Field, Input, Popover, Portal, Stack, Textarea, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";

interface Props {
  onSave: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  createLabel?: string;

  triggerVariant?: "solid" | "ghost" | "subtle" | "outline";
}

type SwitchChange = { open: boolean };

export function FormButton({
  onSave,
  initialTitle,
  initialDescription,
  createLabel = "New Task",
  triggerVariant = "solid",
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

    if (!isEditMode) {
      setTitle("");
      setDescription("");
    }
  }

  const isDisabled = !title.trim();

  return (
    <Popover.Root open={open} onOpenChange={(e: SwitchChange) => setOpen(e.open)}>
      <Popover.Trigger asChild>
        {isEditMode ? (
          <Button
            variant="ghost"
            size="sm"
            aria-label="Edit task"
            color="fg"
            borderWidth="1px"
            borderColor="border"
            bg="transparent"
            _hover={{ bg: "bg.subtle" }}
            _active={{ bg: "bg.muted" }}
          >
            <Icon as={FiEdit2} fontSize="lg" />
          </Button>
        ) : (
          <Button variant={triggerVariant} size="sm" colorPalette="brand">
            {createLabel}
          </Button>
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
            <Popover.Arrow bg="surface" />
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

                <Button size="sm" onClick={handleSave} disabled={isDisabled} colorPalette="brand">
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
