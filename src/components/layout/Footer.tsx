import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-auto h-auto py-12 md:py-24 bg-card/50">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <Link href="/" className="text-2xl font-medium tracking-tighter">
            Lalit.<span className="text-muted-foreground">Dev</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lalit. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Twitter ↗
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            LinkedIn ↗
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            GitHub ↗
          </Link>
        </div>
      </div>
    </footer>
  );
};
