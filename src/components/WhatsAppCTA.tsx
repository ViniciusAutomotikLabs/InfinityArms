import { siteConfig, whatsappUrl } from "@/lib/site";
import type { Product } from "@/lib/types";

export function WhatsAppCTA({
  product,
  className = "",
}: {
  product?: Product;
  className?: string;
}) {
  const message = product
    ? `Olá Mira! Vi o produto "${product.nome}" no site InfinityArms (R$ ${product.preco}) e quero saber mais.`
    : undefined;

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-navy-950 transition hover:bg-gold-light ${className}`}
    >
      Fale com a Mira no WhatsApp
    </a>
  );
}

export function LegalBanner() {
  return (
    <div className="border-y border-gold/20 bg-navy-900/80 px-4 py-3 text-center text-xs leading-relaxed text-steel">
      {siteConfig.legalNotice}
    </div>
  );
}
