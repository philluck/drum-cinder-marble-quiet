import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm text-muted">
          <Link to="/" className="hover:text-fg">
            На главную
          </Link>
        </p>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl">{title}</h1>
        <div className="legal-body mt-8 space-y-4 text-sm leading-relaxed text-muted [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-fg [&_a]:text-fg [&_a]:underline-offset-2 hover:[&_a]:underline">
          {children}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
