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
      <footer className="site-footer" id="site-footer">
        <p className="font-semibold text-foreground tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-cyan inline-block"></span>
          BAHADIR UÇAN
        </p>
        <p className="text-muted mt-2">
          Çizginin ve Hareketin Akademisi
        </p>
        <p className="text-xs mt-6 text-subtle">
          © {new Date().getFullYear()} Tüm Hakları Saklıdır.
        </p>
      </footer>
    </>
  );
}
