import CreateTopicButton from "@/components/topics/create-topic-button";
import TopicList from "@/components/topics/topic-list";

export default function Home() {
  return (
    <div className="flex gap-6">
      <section className="flex-1">
        <h2 className="text-xl font-bold">最热</h2>
        <p className="mt-4 text-muted">暂无话题，快去创建一个吧。</p>
      </section>

      <aside className="hidden w-56 shrink-0 space-y-4 md:block">
        <CreateTopicButton />
        <TopicList />
      </aside>
    </div>
  );
}
