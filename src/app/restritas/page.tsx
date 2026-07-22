import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { LegalBanner } from "@/components/WhatsAppCTA";
import { getProductsByCategoria } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo — Uso Restrito",
  description:
    "Armas de uso restrito. Exige Certificado de Registro com categoria compatível.",
};

export default function RestritasPage() {
  const products = getProductsByCategoria("restrito");

  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Uso restrito"
        description="Calibres restritos (ex.: 9mm). A aquisição exige CR com categoria compatível — nível 3 ou superior, conforme o caso."
      />
      <LegalBanner />
      <div className="border-b border-red-900/40 bg-red-950/30 px-4 py-4 text-center text-sm text-red-100/90">
        Atenção: produtos restritos. Confirme sua categoria no CR antes de
        avançar. A Mira pode orientar, mas a análise documental é obrigatória.
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <p className="mb-8 text-sm text-steel">{products.length} produtos</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
