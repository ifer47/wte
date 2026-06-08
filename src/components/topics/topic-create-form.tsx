"use client";

import {
  Alert,
  Button,
  FieldError,
  Form,
  Input,
  Label,
  Modal,
  Spinner,
  TextArea,
  TextField,
} from "@heroui/react";
import * as actions from "@/actions";
import { useActionState } from "react";

interface TopicCreateFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function TopicCreateForm({
  isOpen,
  onOpenChange,
}: TopicCreateFormProps) {
  const [state, formAction, isPending] = useActionState(actions.createTopic, {
    fieldErrors: {},
  });

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Container>
        <Modal.Dialog className="sm:max-w-md">
          <Modal.CloseTrigger />
          <Modal.Header>
            <Modal.Heading>创建话题</Modal.Heading>
          </Modal.Header>
          <Form action={formAction} validationErrors={state.fieldErrors}>
            <Modal.Body className="flex flex-col gap-4">
              <TextField name="name">
                <Label>名称</Label>
                <Input placeholder="话题名称" />
                <FieldError />
              </TextField>

              <TextField name="description">
                <Label>描述</Label>
                <TextArea placeholder="描述你的话题" rows={4} />
                <FieldError />
              </TextField>

              {state.formError && (
                <Alert status="danger">
                  <Alert.Content>
                    <Alert.Description>{state.formError}</Alert.Description>
                  </Alert.Content>
                </Alert>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="ghost">
                取消
              </Button>
              <Button type="submit" isDisabled={isPending}>
                {isPending ? (
                  <>
                    <Spinner size="sm" color="current" />
                    处理中…
                  </>
                ) : "提交"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
