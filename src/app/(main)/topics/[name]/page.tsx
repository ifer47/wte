import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import CreatePostButton from "@/components/posts/create-post-button";

interface TopicShowPageProps {
  params: Promise<{ name: string }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { name } = await params;

  const topic = await db.topic.findUnique({
    where: { name },
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
        include: { user: true },
      },
    },
  });

  if (!topic) notFound();

  return (
    <div className="flex gap-6">
      <section className="flex-1">
        <h2 className="text-xl font-bold">{topic.name}</h2>
        <p className="mt-1 text-sm text-muted">{topic.description}</p>

        <div className="mt-6 space-y-4">
          {topic.posts.length === 0 ? (
            <p className="text-muted">暂无帖子，快去创建一个吧。</p>
          ) : (
            topic.posts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg border border-separator p-4"
              >
                <h3 className="font-medium">{post.title}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                  <span>{post.user?.name ?? "匿名"}</span>
                  <span>&middot;</span>
                  <span>{post.createdAt.toLocaleDateString("zh-CN")}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <aside className="hidden w-56 shrink-0 space-y-4 md:block">
        <CreatePostButton topicName={topic.name} />
      </aside>
    </div>
  );
}
