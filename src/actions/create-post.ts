"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface CreatePostFormState {
  fieldErrors: Record<string, string>;
  formError?: string;
}

const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "标题至少 3 个字符")
    .max(200, "标题不能超过 200 个字符"),
  content: z.string().min(10, "内容至少 10 个字符"),
  topicName: z.string().min(1),
});

export async function createPost(
  _prevState: CreatePostFormState,
  formData: FormData,
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    topicName: formData.get("topicName"),
  });

  if (!result.success) {
    const { fieldErrors: flat } = z.flattenError(result.error);
    const fieldErrors = Object.fromEntries(
      Object.entries(flat)
        .filter(([, msgs]) => msgs?.length)
        .map(([key, msgs]) => [key, msgs![0]]),
    );
    return { fieldErrors };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { fieldErrors: {}, formError: "请先登录再操作。" };
  }

  const topic = await db.topic.findUnique({
    where: { name: result.data.topicName },
    select: { id: true },
  });

  if (!topic) {
    return { fieldErrors: {}, formError: "话题不存在。" };
  }

  try {
    await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) throw err;
    if (err instanceof Error) {
      return { fieldErrors: {}, formError: err.message };
    }
    return { fieldErrors: {}, formError: "创建帖子时发生未知错误。" };
  }

  redirect(`/topics/${result.data.topicName}`);
}
