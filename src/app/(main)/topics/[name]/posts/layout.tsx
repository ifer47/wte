export default function PostEditorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-background">
      {children}
    </div>
  );
}
