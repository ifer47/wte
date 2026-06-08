"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import TopicCreateForm from "@/components/topics/topic-create-form";

export default function CreateTopicButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="w-full"
        variant="secondary"
        onPress={() => setIsOpen(true)}
      >
        创建话题
      </Button>
      <TopicCreateForm isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
