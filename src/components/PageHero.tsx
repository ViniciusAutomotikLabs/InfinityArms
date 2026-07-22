import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-navy-900">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid bg-[size:48px_48px] opacity-40" />
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-gold/10 blur-3xl animate-soft-pulse" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 max-w-3xl font-display text-4xl text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}

export function ContentSection({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {title && (
        <h2 className="font-display text-2xl text-gold sm:text-3xl">{title}</h2>
      )}
      <div className={`prose-demo space-y-4 text-steel leading-relaxed ${title ? "mt-6" : ""}`}>
        {children}
      </div>
    </section>
  );
}
