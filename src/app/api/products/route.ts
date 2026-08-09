import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const items = searchProducts({
    categoria: searchParams.get("categoria"),
    q: searchParams.get("q"),
    tipo: searchParams.get("tipo"),
    disponivel: searchParams.get("disponivel"),
  });

  return NextResponse.json({
    source: "infinityarms-demo",
    updated_at: "2026-catalog-v2",
    count: items.length,
    products: items,
  });
}
