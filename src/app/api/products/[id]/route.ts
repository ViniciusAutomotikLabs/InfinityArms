import { NextResponse } from "next/server";
import { getProductById, getProductBySlug } from "@/lib/products";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const product = getProductById(id) || getProductBySlug(id);

  if (!product) {
    return NextResponse.json(
      { error: "Produto não encontrado", id },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
