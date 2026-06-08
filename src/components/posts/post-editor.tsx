"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmZhHans from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import { Button, Chip, Form, Input } from "@heroui/react";
import * as actions from "@/actions";
import "bytemd/dist/index.css";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown-light.css";

const plugins = [gfm({ locale: gfmZhHans }), highlight()];

interface PostEditorProps {
  topicName: string;
}

export default function PostEditor({ topicName }: PostEditorProps) {
  const [content, setContent] = useState("");
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(actions.createPost, {
    fieldErrors: {},
  });

  function handleSubmit(formData: FormData) {
    formData.set("content", content);
    formData.set("topicName", topicName);
    formAction(formData);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* 顶栏 */}
      <Form action={handleSubmit} validationErrors={state.fieldErrors}>
        <header className="flex h-14 shrink-0 items-center gap-4 border-b border-separator px-6">
          <Input
            name="title"
            placeholder="输入文章标题..."
            className="title-input flex-1 border-transparent bg-transparent text-xl font-bold shadow-none placeholder:text-muted"
          />

          <Chip variant="soft" className="shrink-0">
            {topicName}
          </Chip>

          <Button type="submit" size="sm" isDisabled={isPending}>
            {isPending ? "发布中…" : "发布"}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onPress={() => router.push(`/topics/${topicName}`)}
          >
            返回
          </Button>
        </header>

        {(state.formError || state.fieldErrors.title || state.fieldErrors.content) && (
          <div className="flex items-center gap-2 border-b border-separator px-6 py-2 text-xs text-danger">
            {state.formError ?? state.fieldErrors.title ?? state.fieldErrors.content}
          </div>
        )}
      </Form>

      {/* 编辑器 */}
      <div className="bytemd-fullscreen" style={{ height: "calc(100vh - 3.5rem)" }}>
        <Editor
          value={content}
          plugins={plugins}
          locale={zhHans}
          onChange={setContent}
        />
      </div>
    </div>
  );
}
