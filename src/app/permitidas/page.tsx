import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { LegalBanner } from "@/components/WhatsAppCTA";
import { getProductsByCategoria } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo — Uso Permitido",
  description:
    "Armas de uso permitido: pistolas, revólveres, rifles e espingardas com preços e fichas técnicas.",
};

export default function PermitidasPage() {
  const products = getProductsByCategoria("permitido");

  return (
    <>
      <PageHero
        eyebrow="Catálogo"
        title="Uso permitido"
        description="Modelos de calibre permitido disponíveis para demonstração. Preços arredondados a partir de referência de mercado."
      />
      <LegalBanner />
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
