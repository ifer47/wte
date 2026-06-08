import React from "react";

interface TopicShowPageProps {
  params: Promise<{ name: string }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const name = (await params).name;
  return <div>针对 {name} 话题的列表页</div>;
}