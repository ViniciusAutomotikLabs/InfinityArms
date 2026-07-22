import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LegalBanner, WhatsAppCTA } from "@/components/WhatsAppCTA";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { formatBRL, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produto" };
  return {
    title: product.nome,
    description: `${product.nome} — ${product.calibre} · ${formatBRL(product.preco)}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nome,
    brand: product.marca,
    image: product.imagem_url,
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: product.preco,
      availability: product.disponivel
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  const specs = [
    ["Calibre", product.calibre],
    ["Capacidade", product.capacidade],
    ["Comp. cano", product.comprimento_cano],
    ["Ação", product.acao],
    ["Peso", product.peso],
    ["Acabamento", product.acabamento],
    ["Tipo", product.tipo],
    ["Requisito", product.requisito_categoria],
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LegalBanner />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-navy-900">
          <Image
            src={product.imagem_url}
            alt={product.nome}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gold">
            {product.marca} ·{" "}
            {product.categoria_uso === "restrito" ? "Uso restrito" : "Uso permitido"}
          </p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            {product.nome}
          </h1>
          <p className="mt-6 font-display text-3xl text-gold">
            {formatBRL(product.preco)}
          </p>
          <p className="text-sm text-steel">{product.preco_parcelado}</p>
          <p className="mt-2 text-sm text-steel">
            {product.disponivel ? "Disponível para consulta" : "Indisponível"}
          </p>

          {product.categoria_uso === "restrito" && (
            <p className="mt-4 border border-red-800/50 bg-red-950/40 px-4 py-3 text-sm text-red-100">
              Produto restrito — exige categoria compatível no CR (
              {product.requisito_categoria}).
            </p>
          )}

          <div className="mt-8">
            <WhatsAppCTA product={product} />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-steel/80">
            {siteConfig.legalNotice} A confirmação final depende de documentação
            e análise do consultor/despachante.
          </p>
        </div>
      </div>

      <section className="border-t border-white/10 bg-navy-900/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl text-gold">Ficha técnica</h2>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {specs.map(([label, value]) => (
              <div key={label} className="border border-white/10 bg-navy-950/50 p-4">
                <dt className="text-[11px] uppercase tracking-wider text-steel">
                  {label}
                </dt>
                <dd className="mt-2 text-sm text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
