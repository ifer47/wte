"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

interface CreatePostButtonProps {
  topicName: string;
}

export default function CreatePostButton({ topicName }: CreatePostButtonProps) {
  const router = useRouter();
  return (
    <Button
      className="w-full"
      variant="secondary"
      onPress={() => router.push(`/topics/${topicName}/posts`)}
    >
      创建帖子
    </Button>
  );
}
