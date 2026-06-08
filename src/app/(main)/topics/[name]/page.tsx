import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import CreatePostButton from "@/components/posts/create-post-button";
import PostsList from "@/components/posts/posts-list";

interface TopicShowPageProps {
  params: Promise<{ name: string }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { name } = await params;

  const topic = await db.topic.findUnique({
    where: { name },
    select: { name: true, description: true },
  });

  if (!topic) notFound();

  return (
    <div className="flex gap-6">
      <section className="flex-1">
        <h2 className="text-xl font-bold">{topic.name}</h2>
        <p className="mt-1 text-sm text-muted">{topic.description}</p>
        <div className="mt-6">
          <PostsList topicName={topic.name} />
        </div>
      </section>

      <aside className="hidden w-56 shrink-0 space-y-4 md:block">
        <CreatePostButton topicName={topic.name} />
      </aside>
    </div>
  );
}
