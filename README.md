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

Base URL (após o deploy): `https://SEU-DOMINIO.vercel.app`

| Método | Endpoint | Uso |
|--------|----------|-----|
| `GET` | `/api/products` | Lista completa (JSON) |
| `GET` | `/api/products?categoria=permitido` | Filtra permitido/restrito |
| `GET` | `/api/products?q=G2C` | Busca por nome/calibre/marca |
| `GET` | `/api/products/[id]` | Produto por `id` ou `slug` |
| `GET` | `/api/products.csv` | Export CSV (planilha) |

### Exemplo de resposta

```json
{
  "source": "infinityarms-demo",
  "count": 51,
  "products": [
    {
      "id": "perm-g2c-38tpc-preta",
      "nome": "Pistola Taurus G2C 38TPC Preta",
      "categoria_uso": "permitido",
      "tipo": "pistola",
      "marca": "Taurus",
      "calibre": ".38 TPC",
      "preco": 4600,
      "preco_parcelado": "12x de R$ 435,00",
      "disponivel": true,
      "requisito_categoria": "nenhum",
      "url_produto": "/produto/pistola-taurus-g2c-38tpc-preta",
      "imagem_url": "/catalog/permitidas/page-0001.jpg"
    }
  ]
}
```

### Nó HTTP Request no n8n

1. Trigger WhatsApp → Agent Mira
2. Tool / HTTP Request: `GET {{$env.SITE_URL}}/api/products?q={{query}}`
3. Resposta montada com `preco`, `disponivel` e `requisito_categoria` retornados pela API

Para importar no Google Sheets depois: baixe `/api/products.csv` e importe a planilha.

## Variáveis de ambiente

Copie `.env.example` → `.env.local`:

- `NEXT_PUBLIC_WHATSAPP` — número internacional sem `+` (ex.: `5561999990000`)
- `NEXT_PUBLIC_WHATSAPP_DISPLAY` — exibição amigável
- `NEXT_PUBLIC_SITE_URL` — URL canônica (sitemap)

## Páginas

`/`, `/permitidas`, `/restritas`, `/produto/[slug]`, `/cac`, `/defesa-pessoal`, `/policial-militar`, `/clube`, `/despachante`, `/faq`, `/contato`, `/privacidade`, `/termos`

## Aviso legal

Site demonstrativo. Dados e preços simulados. Aquisição de produtos controlados exige documentação legal. Conteúdo 18+.
