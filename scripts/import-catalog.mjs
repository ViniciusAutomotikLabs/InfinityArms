/**
 * Downloads official Taurus/Rossi product photos and regenerates data/products.json.
 * Source: produtos_site_arms.xlsx (curated v2 catalog).
 *
 * Usage: node scripts/import-catalog.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public/catalog/oficial");
const OUT_JSON = join(ROOT, "data/products.json");

function formatParcelado(preco) {
  const parcela = Math.round((preco / 12) * 100) / 100;
  const formatted = parcela.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `12x de R$ ${formatted}`;
}

function buildProduct(raw) {
  const {
    id,
    slug,
    nome,
    categoria_uso,
    tipo,
    marca,
    calibre,
    capacidade,
    preco,
    comprimento_cano,
    acao,
    peso,
    acabamento,
    descricao,
    imageExt,
  } = raw;

  return {
    id,
    slug,
    nome,
    categoria_uso,
    tipo,
    marca,
    calibre,
    capacidade,
    preco,
    preco_parcelado: formatParcelado(preco),
    disponivel: true,
    requisito_categoria:
      categoria_uso === "restrito"
        ? "força de segurança, atirador nível 3 ou caçador"
        : "atirador nível 1 (tiro desportivo), caçador, posse ou porte",
    url_produto: `/produto/${slug}`,
    imagem_url: `/catalog/oficial/${slug}${imageExt}`,
    comprimento_cano,
    acao,
    peso,
    acabamento,
    descricao,
  };
}

/** Catalog from produtos_site_arms.xlsx — Foto Oficial hyperlinks + specs. */
const CATALOG = [
  {
    id: "rest-gx2-9mm",
    slug: "pistola-taurus-gx2-9mm",
    nome: "Pistola Taurus GX2",
    categoria_uso: "restrito",
    tipo: "pistola",
    marca: "Taurus",
    calibre: "9mm (9x19)",
    capacidade: "13+1",
    preco: 4990,
    comprimento_cano: '3,39" (86mm)',
    acao: "SA - Striker Fire",
    peso: "≈ 610g",
    acabamento: "Carbono Fosco",
    descricao:
      "A GX2 dá continuidade à linha G2C, líder mundial em vendas na categoria compacta. Pistola ideal para defesa pessoal e porte velado, com gatilho de 3ª geração, ferrolho zigrinado e trilho Picatinny para acessórios. Ótimo custo-benefício para quem busca uma primeira arma confiável.",
    imageUrl:
      "https://taurusarmas.com.br/public/files/produtos/imagens/eXrmjVPcNzTJrw1a1x4mvQl92QLzjmADgxJmDB59.jpg",
  },
  {
    id: "rest-g3-toro-9mm",
    slug: "pistola-taurus-g3-toro-9mm",
    nome: "Pistola Taurus G3 T.O.R.O.",
    categoria_uso: "restrito",
    tipo: "pistola",
    marca: "Taurus",
    calibre: "9mm (9x19)",
    capacidade: "17+1",
    preco: 5590,
    comprimento_cano: '4" (114,3mm)',
    acao: "SA/DA",
    peso: "721g",
    acabamento: "Cerakote Patriot Brown",
    descricao:
      "Versão T.O.R.O. (Taurus Optic Ready Option) da consagrada G3, já preparada de fábrica para receber miras ópticas sem customização. Gatilho de 3ª geração com acionamento suave e desarme limpo, ferrolho zigrinado e alta capacidade de disparos — indicada para uso policial, esportivo e defesa pessoal.",
    imageUrl:
      "https://taurusarmas.com.br/public/files/produtos/imagens/10031120-07.jpg",
  },
  {
    id: "rest-g3xl-toro-9mm",
    slug: "pistola-taurus-g3xl-toro-9mm",
    nome: "Pistola Taurus G3 XL T.O.R.O.",
    categoria_uso: "restrito",
    tipo: "pistola",
    marca: "Taurus",
    calibre: "9mm (9x19)",
    capacidade: "12+1",
    preco: 5890,
    comprimento_cano: '4"',
    acao: "SA/DA",
    peso: "700g",
    acabamento: "Cerakote / Tenox",
    descricao:
      "Mantém a empunhadura confortável da G3c com ferrolho maior, ganhando precisão nos disparos. Compatível com o sistema T.O.R.O. para acoplar miras ópticas com placas intercambiáveis, além de trilho Picatinny para lanterna ou laser. Boa opção para quem já usa a linha G3 e quer mais controle.",
    imageUrl:
      "https://taurusarmas.com.br/public/files/produtos/imagens/10033809-03.jpg",
  },
  {
    id: "perm-gx4-carry-graphene",
    slug: "pistola-taurus-gx4-carry-graphene",
    nome: "Pistola Taurus GX4 Carry Graphene",
    categoria_uso: "permitido",
    tipo: "pistola",
    marca: "Taurus",
    calibre: ".380 ACP",
    capacidade: "15+1",
    preco: 6590,
    comprimento_cano: '3,7" (94mm)',
    acao: "Striker Fire",
    peso: "593g",
    acabamento: "Grafeno (alta resistência)",
    descricao:
      "A plataforma mais premiada do mercado norte-americano chega em .380 ACP. Subcompacta, com tecnologia de Grafeno que aumenta resistência e durabilidade, empunhadura ergonômica e alta capacidade para o porte — ideal para quem busca discrição sem abrir mão de capacidade de disparos.",
    imageUrl:
      "https://taurusarmas.com.br/public/files/produtos/imagens/6xfZBJNMkfOPpJWHptGinG2J55uvK7dx9zDWyIte.png",
  },
  {
    id: "perm-th380",
    slug: "pistola-taurus-th380",
    nome: "Pistola Taurus TH380",
    categoria_uso: "permitido",
    tipo: "pistola",
    marca: "Taurus",
    calibre: ".380 ACP",
    capacidade: "18+1",
    preco: 7390,
    comprimento_cano: '4,25" (108mm)',
    acao: "SA/DA",
    peso: "790g",
    acabamento: "Tenox",
    descricao:
      "Pistola com teclas 100% ambidestras e alta capacidade de disparos (18 tiros). Armação de polímero, cão externo e trilho Picatinny para acessórios. Versátil para uso esportivo, policial, militar e defesa pessoal.",
    imageUrl:
      "https://taurusarmas.com.br/public/files/produtos/imagens/10015729-02.jpg",
  },
  {
    id: "perm-59s-inox-fosco",
    slug: "pistola-taurus-59s-inox-fosco",
    nome: "Pistola Taurus 59S Inox Fosco",
    categoria_uso: "permitido",
    tipo: "pistola",
    marca: "Taurus",
    calibre: ".380 ACP",
    capacidade: "19+1",
    preco: 9990,
    comprimento_cano: '5,1" (131mm)',
    acao: "SA/DA",
    peso: "955g",
    acabamento: "Inoxidável Fosco",
    descricao:
      "Armação em alumínio e alta capacidade de disparos (19 tiros), com cão externo, trava manual e desarmador ambidestros. Um clássico da Taurus, elegante em acabamento inox, indicado para esporte, defesa pessoal e uso institucional.",
    imageUrl:
      "https://taurusarmas.com.br/public/files/produtos/imagens/10011647-02.jpg",
  },
  {
    id: "perm-85s-2",
    slug: "revolver-taurus-85s-2",
    nome: 'Revólver Taurus 85S 2"',
    categoria_uso: "permitido",
    tipo: "revolver",
    marca: "Taurus",
    calibre: ".38 SPL",
    capacidade: "5 tiros",
    preco: 4690,
    comprimento_cano: '2"',
    acao: "SA/DA",
    peso: "≈ 500g",
    acabamento: "Carbono Fosco",
    descricao:
      "Compacto e discreto, o 85S é indicado como arma de backup e para defesa pessoal. Confiável e portátil, aceita também munição +P. Um dos revólveres mais populares do Brasil pela simplicidade e robustez.",
    imageUrl:
      "https://taurusarmas.com.br/public/files/produtos/imagens/5QdN6Lj42tgyo2aL4a1pItpLloITkgQUsdIcLUo4.png",
  },
  {
    id: "perm-856",
    slug: "revolver-taurus-856",
    nome: "Revólver Taurus 856",
    categoria_uso: "permitido",
    tipo: "revolver",
    marca: "Taurus",
    calibre: ".38 SPL",
    capacidade: "6 tiros",
    preco: 5390,
    comprimento_cano: '3"',
    acao: "SA/DA",
    peso: "680g",
    acabamento: "Preto Fosco",
    descricao:
      "Ideal para porte velado, combina armação pequena com alta capacidade (6 tiros) e cano de 3\" para disparos mais precisos. Punho anatômico de borracha e acabamento discreto; aceita munição +P.",
    imageUrl:
      "https://taurusarmas.com.br/public/files/produtos/imagens/10021236-01.jpg",
  },
  {
    id: "perm-889-4",
    slug: "revolver-taurus-889-4",
    nome: 'Revólver Taurus 889 4"',
    categoria_uso: "permitido",
    tipo: "revolver",
    marca: "Taurus",
    calibre: ".38 SPL",
    capacidade: "6 tiros",
    preco: 6490,
    comprimento_cano: '4" (banda ventilada)',
    acao: "SA/DA",
    peso: "1059g",
    acabamento: "Inox Alto Brilho",
    descricao:
      "Resistente e preciso, indicado para tiro esportivo e defesa pessoal. Vértice de mira ajustável e cano de 4\" com banda ventilada para melhor equilíbrio e precisão. Aceita munição +P.",
    imageUrl:
      "https://taurusarmas.com.br/public/files/produtos/imagens/BjrWzov78fCy7Cjv0M0oIFc9fsDjSukvXwE7QLNR.png",
  },
  {
    id: "perm-rossi-lever-action-38",
    slug: "carabina-rossi-lever-action-24-inox",
    nome: 'Carabina Lever Action Rossi 24" Inox',
    categoria_uso: "permitido",
    tipo: "carabina",
    marca: "Rossi",
    calibre: ".38 SPL",
    capacidade: "12+1",
    preco: 9390,
    comprimento_cano: '24"',
    acao: "Repetição (alavanca)",
    peso: "3,4 kg",
    acabamento: "Inox Alto Brilho / Coronha em madeira de lei",
    descricao:
      "O equilíbrio entre tradição e tecnologia: coronha em madeira de lei encerada, soleira em aço e alça de mira regulável. Alavanca com ferrolho de duplo trancamento e percussor flutuante — equipamento clássico para lazer, colecionismo e tiro esportivo.",
    imageUrl:
      "https://taurusarmas.com.br/public/files/produtos/imagens/sXQNUFmIQQTZkzFWxxET94RL0TFCRCIHl9aMdzlC.png",
  },
];

async function downloadImage(url, destPath) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; InfinityArmsCatalog/1.0; +https://bot-firearms.vercel.app)",
      Accept: "image/*,*/*",
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destPath, buf);
  return buf.length;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const products = [];

  for (const item of CATALOG) {
    const ext = extname(new URL(item.imageUrl).pathname).toLowerCase() || ".jpg";
    const imageExt = ext === ".jpeg" ? ".jpg" : ext;
    const dest = join(OUT_DIR, `${item.slug}${imageExt}`);
    const bytes = await downloadImage(item.imageUrl, dest);
    console.log(`✓ ${item.slug}${imageExt} (${bytes} bytes)`);
    products.push(buildProduct({ ...item, imageExt }));
  }

  await writeFile(OUT_JSON, `${JSON.stringify(products, null, 2)}\n`, "utf8");
  console.log(`\nWrote ${products.length} products → data/products.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
