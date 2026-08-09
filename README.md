# InfinityArms

Site demonstrativo de loja de armas + clube de tiro, pensado para a **Mira** (agente WhatsApp / n8n) consultar o mesmo catálogo que o público vê.

Repositório: [ViniciusAutomotikLabs/InfinityArms](https://github.com/ViniciusAutomotikLabs/InfinityArms)

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Fonte única: [`data/products.json`](data/products.json)
- Deploy: Vercel

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## API para o n8n (tabela do bot)

Documentação completa: [`docs/API.md`](docs/API.md)

Base URL (produção): `https://bot-firearms.vercel.app`

| Método | Endpoint | Uso |
|--------|----------|-----|
| `GET` | `/api/products` | Lista completa (JSON) |
| `GET` | `/api/products?categoria=permitido` | Filtra permitido/restrito |
| `GET` | `/api/products?q=TH380` | Busca por nome/calibre/marca |
| `GET` | `/api/products/[id]` | Produto por `id` ou `slug` |
| `GET` | `/api/products.csv` | Export CSV (planilha) |

### Exemplo de resposta

```json
{
  "source": "infinityarms-demo",
  "updated_at": "2026-catalog-v2",
  "count": 10,
  "products": [
    {
      "id": "perm-th380",
      "nome": "Pistola Taurus TH380",
      "categoria_uso": "permitido",
      "tipo": "pistola",
      "marca": "Taurus",
      "calibre": ".380 ACP",
      "preco": 7390,
      "preco_parcelado": "12x de R$ 615,83",
      "disponivel": true,
      "requisito_categoria": "atirador nível 1 (tiro desportivo), caçador, posse ou porte",
      "url_produto": "/produto/pistola-taurus-th380",
      "imagem_url": "/catalog/oficial/pistola-taurus-th380.jpg",
      "descricao": "Pistola com teclas 100% ambidestras e alta capacidade de disparos (18 tiros)..."
    }
  ]
}
```

Regenerar catálogo + fotos oficiais: `npm run import:catalog`

### Nó HTTP Request no n8n

1. Trigger WhatsApp → Agent Mira
2. Tool / HTTP Request: `GET {{$env.SITE_URL}}/api/products?q={{query}}`
3. Resposta montada com `preco`, `disponivel` e `requisito_categoria` retornados pela API

Para importar no Google Sheets depois: baixe `/api/products.csv` e importe a planilha.

## Variáveis de ambiente

Copie `.env.example` → `.env.local`:

- `NEXT_PUBLIC_WHATSAPP` — número internacional sem `+` (ex.: `5521992596159`)
- `NEXT_PUBLIC_WHATSAPP_DISPLAY` — exibição amigável (ex.: `(21) 99259-6159`)
- `NEXT_PUBLIC_SITE_URL` — URL canônica (sitemap)

## Páginas

`/`, `/permitidas`, `/restritas`, `/produto/[slug]`, `/cac`, `/defesa-pessoal`, `/policial-militar`, `/clube`, `/despachante`, `/faq`, `/contato`, `/privacidade`, `/termos`

## Aviso legal

Site demonstrativo. Dados e preços simulados. Aquisição de produtos controlados exige documentação legal. Conteúdo 18+.
