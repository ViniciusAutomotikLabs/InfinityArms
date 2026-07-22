import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-navy-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-gold">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-steel">
            {siteConfig.tagline}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-gold-dim">
            {siteConfig.authorization}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Navegação
          </p>
          <ul className="mt-4 space-y-2 text-sm text-steel">
            <li>
              <Link href="/permitidas" className="hover:text-gold">
                Catálogo permitido
              </Link>
            </li>
            <li>
              <Link href="/restritas" className="hover:text-gold">
                Catálogo restrito
              </Link>
            </li>
            <li>
              <Link href="/despachante" className="hover:text-gold">
                Despachante parceiro
              </Link>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-gold">
                Privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos" className="hover:text-gold">
                Termos de uso
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Contato
          </p>
          <ul className="mt-4 space-y-2 text-sm text-steel">
            <li>{siteConfig.address}</li>
            <li>CNPJ {siteConfig.cnpj}</li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold"
              >
                WhatsApp {siteConfig.whatsappDisplay}
              </a>
            </li>
            <li>{siteConfig.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-6 text-center text-xs text-steel/70">
        <p>{siteConfig.legalNotice}</p>
        <p className="mt-2">
          Site demonstrativo · dados simulados · © {new Date().getFullYear()}{" "}
          {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
