export type CategoriaUso = "permitido" | "restrito";

export type TipoArma =
  | "pistola"
  | "revolver"
  | "rifle"
  | "carabina"
  | "espingarda"
  | "fuzil";

export interface Product {
  id: string;
  slug: string;
  nome: string;
  categoria_uso: CategoriaUso;
  tipo: TipoArma;
  marca: string;
  calibre: string;
  capacidade: string;
  preco: number;
  preco_parcelado: string;
  disponivel: boolean;
  requisito_categoria: string;
  url_produto: string;
  imagem_url: string;
  comprimento_cano: string;
  acao: string;
  peso: string;
  acabamento: string;
}
