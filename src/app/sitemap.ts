import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://infinityarms.vercel.app";
  const staticRoutes = [
    "",
    "/permitidas",
    "/restritas",
    "/cac",
    "/defesa-pessoal",
    "/policial-militar",
    "/clube",
    "/despachante",
    "/faq",
    "/contato",
    "/privacidade",
    "/termos",
  ];

  const products = getAllProducts().map((p) => ({
    url: `${base}${p.url_produto}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...products,
  ];
}
