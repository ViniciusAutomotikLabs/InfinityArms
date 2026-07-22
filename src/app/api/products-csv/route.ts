import { NextRequest, NextResponse } from "next/server";
import { productsToCsv, searchProducts } from "@/lib/products";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const items = searchProducts({
    categoria: searchParams.get("categoria"),
    q: searchParams.get("q"),
    tipo: searchParams.get("tipo"),
    disponivel: searchParams.get("disponivel"),
  });

  const csv = productsToCsv(items);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="infinityarms-products.csv"',
      "Cache-Control": "public, max-age=60",
    },
  });
}
