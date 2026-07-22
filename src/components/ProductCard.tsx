import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatBRL } from "@/lib/site";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={product.url_produto}
      className="group flex flex-col overflow-hidden border border-white/10 bg-navy-900/60 transition hover:border-gold/40 hover:bg-navy-800/80"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-navy-950">
        <Image
          src={product.imagem_url}
          alt={product.nome}
          fill
          className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span
          className={`absolute left-3 top-3 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${
            product.categoria_uso === "restrito"
              ? "bg-red-900/90 text-red-100"
              : "bg-navy-800/90 text-gold"
          }`}
        >
          {product.categoria_uso === "restrito" ? "Restrito" : "Permitido"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-steel">
          {product.marca} · {product.calibre}
        </p>
        <h3 className="mt-2 font-display text-lg leading-snug text-white group-hover:text-gold">
          {product.nome}
        </h3>
        <p className="mt-auto pt-4 font-display text-xl text-gold">
          {formatBRL(product.preco)}
        </p>
        <p className="text-xs text-steel">{product.preco_parcelado}</p>
      </div>
    </Link>
  );
}
