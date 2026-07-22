import productsData from "../../data/products.json";
import type { CategoriaUso, Product } from "./types";

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategoria(categoria: CategoriaUso): Product[] {
  return products.filter((p) => p.categoria_uso === categoria);
}

export function searchProducts(opts: {
  categoria?: CategoriaUso | string | null;
  q?: string | null;
  tipo?: string | null;
  disponivel?: string | null;
}): Product[] {
  let result = [...products];

  if (opts.categoria === "permitido" || opts.categoria === "restrito") {
    result = result.filter((p) => p.categoria_uso === opts.categoria);
  }

  if (opts.tipo) {
    const tipo = opts.tipo.toLowerCase();
    result = result.filter((p) => p.tipo === tipo);
  }

  if (opts.disponivel === "true") {
    result = result.filter((p) => p.disponivel);
  } else if (opts.disponivel === "false") {
    result = result.filter((p) => !p.disponivel);
  }

  if (opts.q) {
    const q = opts.q.toLowerCase().trim();
    result = result.filter((p) =>
      [p.nome, p.marca, p.calibre, p.tipo, p.id, p.slug]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }

  return result;
}

export function productsToCsv(items: Product[]): string {
  const headers = [
    "id",
    "nome",
    "categoria_uso",
    "tipo",
    "marca",
    "calibre",
    "capacidade",
    "preco",
    "preco_parcelado",
    "disponivel",
    "requisito_categoria",
    "url_produto",
    "imagem_url",
    "comprimento_cano",
    "acao",
    "peso",
    "acabamento",
  ] as const;

  const escape = (value: string | number | boolean) => {
    const str = String(value);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = items.map((p) =>
    headers.map((h) => escape(p[h as keyof Product] as string | number | boolean)).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}
