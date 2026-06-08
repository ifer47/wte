import PostEditor from "@/components/posts/post-editor";

interface CreatePostPageProps {
  params: Promise<{ name: string }>;
}

export default async function CreatePostPage({ params }: CreatePostPageProps) {
  const { name } = await params;

  return <PostEditor topicName={decodeURIComponent(name)} />;
}
