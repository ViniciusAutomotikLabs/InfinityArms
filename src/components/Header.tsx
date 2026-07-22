"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig, whatsappUrl } from "@/lib/site";

const links = [
  { href: "/permitidas", label: "Permitidas" },
  { href: "/restritas", label: "Restritas" },
  { href: "/cac", label: "Virar CAC" },
  { href: "/clube", label: "Clube" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group">
          <span className="font-display text-2xl tracking-[0.08em] text-gold transition group-hover:text-gold-light">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm uppercase tracking-wider text-steel transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-wider text-navy-950 transition hover:bg-gold-light"
          >
            Fale com a Mira
          </a>
        </nav>

        <button
          type="button"
          className="border border-white/20 px-3 py-2 text-xs uppercase tracking-wider text-steel lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-900 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-wider text-steel"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-gold px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-navy-950"
            >
              Fale com a Mira
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
