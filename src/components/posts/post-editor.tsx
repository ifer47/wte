"use client";

import { useState } from "react";
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import zhHans from "bytemd/locales/zh_Hans.json";
import gfmZhHans from "@bytemd/plugin-gfm/locales/zh_Hans.json";
import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import "bytemd/dist/index.css";
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown-light.css";

const plugins = [gfm({ locale: gfmZhHans }), highlight()];

interface PostEditorProps {
  topicName: string;
}

export default function PostEditor({ topicName }: PostEditorProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handlePublish() {
    // TODO: 调用 server action 创建帖子
    console.log({ topicName, title, content });
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* 顶栏 */}
      <header className="flex h-14 shrink-0 items-center gap-4 border-b border-separator px-6">
        <Link
          href={`/topics/${topicName}`}
          className="text-sm text-muted hover:text-foreground"
        >
          &larr; 返回
        </Link>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入文章标题..."
          className="flex-1 bg-transparent text-xl font-bold outline-none placeholder:text-muted"
        />

        <Chip variant="soft" className="shrink-0">
          {topicName}
        </Chip>

        <Button
          size="sm"
          isDisabled={!title.trim() || !content.trim()}
          onPress={handlePublish}
        >
          发布
        </Button>
      </header>

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
