import { db } from "@/lib/db";
import { Chip } from "@heroui/react";
import Link from "next/link";

export default async function TopicList() {
  const topics = await db.topic.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (!topics.length) {
    return <p className="text-sm text-muted">暂无话题</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <Link key={topic.id} href={`/topics/${topic.name}`}>
          <Chip variant="soft" color="default" className="cursor-pointer text-xs">
            {topic.name}
          </Chip>
        </Link>
      ))}
    </div>
  );
}
