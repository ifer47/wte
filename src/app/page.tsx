"use client";

import { useState } from "react";
import Header from "@/components/header";
import { Button } from "@heroui/react";
import TopicCreateForm from "@/components/topics/topic-create-form";

const categories = ["技术", "创意", "好玩", "程序员", "Linux"];

export default function Home() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-5xl gap-6 px-6 py-8">
        <section className="flex-1">
          <h2 className="text-xl font-bold">最热</h2>
          <p className="mt-4 text-muted">暂无话题，快去创建一个吧。</p>
        </section>

        <aside className="hidden w-56 shrink-0 space-y-4 md:block">
          <Button
            className="w-full"
            variant="secondary"
            onPress={() => setIsCreateOpen(true)}
          >
            创建话题
          </Button>
          <TopicCreateForm
            isOpen={isCreateOpen}
            onOpenChange={setIsCreateOpen}
          />

          <nav>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <span className="cursor-pointer text-sm text-muted hover:text-foreground">
                    {cat}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </main>
    </>
  );
}
