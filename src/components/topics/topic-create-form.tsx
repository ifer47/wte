"use client";

import {
  Alert,
  Button,
  Input,
  Label,
  Modal,
  TextArea,
  TextField,
} from "@heroui/react";
import * as actions from "@/actions";
import { startTransition, useActionState } from "react";

interface TopicCreateFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function TopicCreateForm({
  isOpen,
  onOpenChange,
}: TopicCreateFormProps) {
  const [state, formAction] = useActionState(actions.createTopic, {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => formAction(formData));
  }

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-md">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading>创建话题</Modal.Heading>
          </Modal.Header>
          <form onSubmit={handleSubmit} noValidate>
            <Modal.Body className="flex flex-col gap-4">
              <TextField
                name="name"
                isInvalid={!!state.errors.name}
              >
                <Label>名称</Label>
                <Input placeholder="话题名称" />
                {state.errors.name && (
                  <span className="text-xs text-danger">
                    {state.errors.name.join(", ")}
                  </span>
                )}
              </TextField>

              <TextField
                name="description"
                isInvalid={!!state.errors.description}
              >
                <Label>描述</Label>
                <TextArea placeholder="描述你的话题" rows={4} />
                {state.errors.description && (
                  <span className="text-xs text-danger">
                    {state.errors.description.join(", ")}
                  </span>
                )}
              </TextField>

              {state.errors._form && (
                <Alert status="danger">
                  <Alert.Content>
                    <Alert.Description>
                      {state.errors._form.join(", ")}
                    </Alert.Description>
                  </Alert.Content>
                </Alert>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="ghost">
                取消
              </Button>
              <Button type="submit">提交</Button>
            </Modal.Footer>
          </form>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
