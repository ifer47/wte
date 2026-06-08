import Header from "@/components/header";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-8">
        {children}
      </main>
    </>
  );
}
