import Navbar from "@/components/Navbar";
import FloatingShapes from "@/components/FloatingShapes";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Background floating shapes */}
      <FloatingShapes />

      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 relative" style={{ zIndex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        className="relative border-t py-8 px-6 text-center"
        style={{
          zIndex: 1,
          borderColor: "var(--border)",
        }}
      >
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Bahadır Uçan — Tüm hakları saklıdır.
        </p>
        <p
          className="text-xs mt-1"
          style={{
            fontFamily: "var(--font-handwriting)",
            color: "var(--accent-light)",
            fontSize: "16px",
          }}
        >
          Sanat, hayal gücünün cesaretidir ✨
        </p>
      </footer>
    </>
  );
}
