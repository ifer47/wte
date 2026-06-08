import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-bold">欢迎来到 DISCUSS</h1>
        <p className="mt-2 text-muted">这里是首页，开始探索吧。</p>
      </main>
    </>
  );
}
