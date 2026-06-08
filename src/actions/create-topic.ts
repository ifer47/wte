"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
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
  prevState: CreateTopicFormState,
  formData: FormData,
): Promise<CreateTopicFormState> {
  const name = formData.get("name");
  const description = formData.get("description");
  const result = createTopicSchema.safeParse({ name, description });

  if (!result.success) {
    return { errors: z.flattenError(result.error).fieldErrors };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      errors: { _form: ["请先登录再操作。"] },
    };
  }

  // TODO: 实际创建话题的数据库操作
  return { errors: {} };
}
