import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppCTA, LegalBanner } from "@/components/WhatsAppCTA";
import { getAllProducts } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featured = getAllProducts()
    .filter((p) => p.categoria_uso === "permitido")
    .slice(0, 6);

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden">
        <Image
          src="/catalog/permitidas/page-0001.jpg"
          alt="Catálogo InfinityArms"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/50" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-20 pt-32 sm:px-6">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            Loja autorizada · Clube de tiro
          </p>
          <h1 className="animate-fade-up-delay mt-4 max-w-3xl font-display text-5xl leading-none text-white sm:text-7xl">
            {siteConfig.name}
          </h1>
          <p className="animate-fade-up-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-steel-light">
            {siteConfig.tagline}. Catálogo real para consulta da Mira no
            WhatsApp — preços e disponibilidade em uma única fonte.
          </p>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-4">
            <Link
              href="/permitidas"
              className="bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wider text-navy-950 transition hover:bg-gold-light"
            >
              Ver catálogo
            </Link>
            <WhatsAppCTA />
          </div>
        </div>
      </section>

      <LegalBanner />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            Diferencial
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Loja e clube no mesmo endereço
          </h2>
          <p className="mt-4 text-steel leading-relaxed">
            Orientação para CAC, defesa pessoal e profissionais de segurança —
            com atendimento da Mira no WhatsApp e despachante parceiro para a
            parte documental.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Uso permitido",
              href: "/permitidas",
              text: "Pistolas, revólveres, rifles e espingardas de calibre permitido.",
            },
            {
              title: "Uso restrito",
              href: "/restritas",
              text: "Modelos 9mm e demais calibres restritos — exige CR compatível.",
            },
            {
              title: "Como virar CAC",
              href: "/cac",
              text: "Passo a passo SINARM, níveis e o que você precisa para começar.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border border-white/10 bg-navy-900/50 p-6 transition hover:border-gold/40"
            >
              <h3 className="font-display text-2xl text-gold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-steel">
                {item.text}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-navy-900/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                Destaques
              </p>
              <h2 className="mt-3 font-display text-3xl text-white">
                Catálogo permitido
              </h2>
            </div>
            <Link
              href="/permitidas"
              className="text-sm uppercase tracking-wider text-gold hover:text-gold-light"
            >
              Ver todos →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
              Atendimento
            </p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              Converse com a Mira
            </h2>
            <p className="mt-4 text-steel leading-relaxed">
              A Mira consulta o mesmo catálogo deste site antes de responder
              preço e disponibilidade — sem número decorado no prompt.
            </p>
            <div className="mt-8">
              <WhatsAppCTA />
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-white/10">
            <Image
              src="/catalog/permitidas/page-0010.jpg"
              alt="Clube de tiro InfinityArms"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
