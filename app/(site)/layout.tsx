import Navbar from "@/components/Navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 relative">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="relative border-t py-12 px-6 text-center"
        style={{
          borderColor: "var(--border)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          &copy; {new Date().getFullYear()} Bahadır Uçan
        </p>
      </footer>
    </>
  );
}
