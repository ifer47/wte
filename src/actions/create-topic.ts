"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface CreateTopicFormState {
  fieldErrors: Record<string, string>;
  formError?: string;
}

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3, "名称至少 3 个字符")
    .regex(/^[a-zA-Z0-9_]+$/, "只能包含字母、数字和下划线"),
  description: z
    .string()
    .min(10, "描述至少 10 个字符")
    .max(4747, "描述不能超过 4747 个字符"),
});

export async function createTopic(
  _prevState: CreateTopicFormState,
  formData: FormData,
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
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

  try {
    const topic = await db.topic.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        userId: session.user.id,
      },
    });
    redirect(`/topics/${topic.name}`);
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) throw err;
    if (err instanceof Error && err.message.includes("Unique constraint")) {
      return { fieldErrors: { name: "该话题名称已存在，请换一个。" } };
    }
    if (err instanceof Error) {
      return { fieldErrors: {}, formError: err.message };
    }
    return { fieldErrors: {}, formError: "创建话题时发生未知错误。" };
  }
}
