import { db } from "@/lib/db";

interface PostsListProps {
  topicName: string;
}

export default async function PostsList({ topicName }: PostsListProps) {
  const posts = await db.post.findMany({
    where: { topic: { name: topicName } },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  if (posts.length === 0) {
    return <p className="text-muted">暂无帖子，快去创建一个吧。</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="rounded-lg border border-separator p-4">
          <h3 className="font-medium">{post.title}</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted">
            <span>{post.user?.name ?? "匿名"}</span>
            <span>&middot;</span>
            <span>{post.createdAt.toLocaleString("zh-CN")}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
