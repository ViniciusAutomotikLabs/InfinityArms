"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

const STORAGE_KEY = "infinityarms-age-verified";

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "1") {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-6 backdrop-blur-md">
      <div className="w-full max-w-md border border-gold/30 bg-navy-900 p-8 text-center shadow-2xl">
        <p className="font-display text-3xl tracking-wide text-gold">
          {siteConfig.name}
        </p>
        <h2 className="mt-4 font-display text-xl text-white">
          Conteúdo exclusivo para maiores de 18 anos
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-steel">
          Este site apresenta produtos controlados. Confirme que você tem 18 anos
          ou mais para continuar.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              localStorage.setItem(STORAGE_KEY, "1");
              setOpen(false);
            }}
            className="flex-1 bg-gold px-4 py-3 text-sm font-semibold uppercase tracking-wider text-navy-950 transition hover:bg-gold-light"
          >
            Tenho 18 anos ou mais
          </button>
          <a
            href="https://www.google.com"
            className="flex-1 border border-steel/40 px-4 py-3 text-sm uppercase tracking-wider text-steel transition hover:border-steel hover:text-white"
          >
            Sair
          </a>
        </div>
      </div>
    </div>
  );
}
