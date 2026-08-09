# API InfinityArms — Documentação para n8n / Mira

Documentação da API de catálogo do site demonstrativo InfinityArms.  
Fonte única de verdade: `data/products.json` (site e bot leem os mesmos dados).

| Ambiente | Base URL |
|----------|----------|
| Produção | `https://bot-firearms.vercel.app` |
| Local | `http://localhost:3000` |

Autenticação: **não há**. Todos os endpoints são públicos (GET).

---

## Visão geral

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/products` | Lista produtos (JSON) |
| `GET` | `/api/products/{id}` | Detalhe por `id` ou `slug` |
| `GET` | `/api/products.csv` | Exportação CSV (mesmos filtros) |

Catálogo v2: **10 modelos** com fotos oficiais (`/catalog/oficial/...`).

---

## Modelo de produto

Cada item do array `products` (ou o objeto retornado no detalhe) segue este schema:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | `string` | Identificador único (ex.: `perm-th380`) |
| `slug` | `string` | Slug da URL do site |
| `nome` | `string` | Nome comercial |
| `categoria_uso` | `"permitido"` \| `"restrito"` | Classificação legal de uso |
| `tipo` | `string` | `pistola`, `revolver`, `rifle`, `carabina`, `espingarda`, `fuzil` |
| `marca` | `string` | Fabricante |
| `calibre` | `string` | Calibre (ex.: `9mm (9x19)`, `.380 ACP`) |
| `capacidade` | `string` | Capacidade do carregador/tambor |
| `preco` | `number` | Preço à vista em BRL (número, sem formatação) |
| `preco_parcelado` | `string` | Texto de parcelamento (ex.: `12x de R$ 615,83`) |
| `disponivel` | `boolean` | Estoque / disponibilidade para consulta |
| `requisito_categoria` | `string` | Permitido: `atirador nível 1 (tiro desportivo), caçador, posse ou porte`. Restrito: `força de segurança, atirador nível 3 ou caçador` |
| `url_produto` | `string` | Path relativo da ficha no site (ex.: `/produto/...`) |
| `imagem_url` | `string` | Path relativo da imagem (ex.: `/catalog/oficial/pistola-taurus-th380.jpg`) |
| `comprimento_cano` | `string` | Spec |
| `acao` | `string` | Spec |
| `peso` | `string` | Spec |
| `acabamento` | `string` | Spec |
| `descricao` | `string` | Texto comercial de venda |

### URL absoluta de imagem / página

```
https://bot-firearms.vercel.app{imagem_url}
https://bot-firearms.vercel.app{url_produto}
```

---

## `GET /api/products`

Lista o catálogo com filtros opcionais.

### Query params

| Param | Obrigatório | Valores | Descrição |
|-------|-------------|---------|-----------|
| `categoria` | não | `permitido` \| `restrito` | Filtra por categoria de uso |
| `q` | não | texto | Busca em `nome`, `marca`, `calibre`, `tipo`, `id`, `slug`, `descricao` (case-insensitive) |
| `tipo` | não | `pistola`, `revolver`, etc. | Filtra por tipo |
| `disponivel` | não | `true` \| `false` | Filtra por disponibilidade |

Os filtros são **combinados** (AND).

### Exemplos

```http
GET https://bot-firearms.vercel.app/api/products
GET https://bot-firearms.vercel.app/api/products?categoria=permitido
GET https://bot-firearms.vercel.app/api/products?categoria=restrito&q=GX2
GET https://bot-firearms.vercel.app/api/products?tipo=pistola&disponivel=true
GET https://bot-firearms.vercel.app/api/products?q=taurus%209mm
```

### Resposta `200`

```json
{
  "source": "infinityarms-demo",
  "updated_at": "2026-catalog-v2",
  "count": 10,
  "products": [
    {
      "id": "perm-th380",
      "slug": "pistola-taurus-th380",
      "nome": "Pistola Taurus TH380",
      "categoria_uso": "permitido",
      "tipo": "pistola",
      "marca": "Taurus",
      "calibre": ".380 ACP",
      "capacidade": "18+1",
      "preco": 7390,
      "preco_parcelado": "12x de R$ 615,83",
      "disponivel": true,
      "requisito_categoria": "atirador nível 1 (tiro desportivo), caçador, posse ou porte",
      "url_produto": "/produto/pistola-taurus-th380",
      "imagem_url": "/catalog/oficial/pistola-taurus-th380.jpg",
      "comprimento_cano": "4,25\" (108mm)",
      "acao": "SA/DA",
      "peso": "790g",
      "acabamento": "Tenox",
      "descricao": "Pistola com teclas 100% ambidestras e alta capacidade de disparos (18 tiros)..."
    }
  ]
}
```

| Campo raiz | Tipo | Descrição |
|------------|------|-----------|
| `source` | `string` | Identificador da fonte |
| `updated_at` | `string` | Marcador de versão do catálogo demo |
| `count` | `number` | Quantidade de itens em `products` |
| `products` | `Product[]` | Lista de produtos |

Se nenhum produto corresponder aos filtros: `count: 0` e `products: []` (ainda HTTP 200).

---

## `GET /api/products/{id}`

Retorna um único produto. O segmento `{id}` aceita:

- o campo `id` (ex.: `perm-th380`)
- ou o `slug` (ex.: `pistola-taurus-th380`)

### Exemplos

```http
GET https://bot-firearms.vercel.app/api/products/perm-th380
GET https://bot-firearms.vercel.app/api/products/pistola-taurus-th380
```

### Resposta `200`

Objeto `Product` (sem envelope `source`/`count`):

```json
{
  "id": "perm-th380",
  "slug": "pistola-taurus-th380",
  "nome": "Pistola Taurus TH380",
  "categoria_uso": "permitido",
  "tipo": "pistola",
  "marca": "Taurus",
  "calibre": ".380 ACP",
  "capacidade": "18+1",
  "preco": 7390,
  "preco_parcelado": "12x de R$ 615,83",
  "disponivel": true,
  "requisito_categoria": "atirador nível 1 (tiro desportivo), caçador, posse ou porte",
  "url_produto": "/produto/pistola-taurus-th380",
  "imagem_url": "/catalog/oficial/pistola-taurus-th380.jpg",
  "comprimento_cano": "4,25\" (108mm)",
  "acao": "SA/DA",
  "peso": "790g",
  "acabamento": "Tenox",
  "descricao": "Pistola com teclas 100% ambidestras e alta capacidade de disparos (18 tiros)..."
}
```

### Resposta `404`

```json
{
  "error": "Produto não encontrado",
  "id": "produto-inexistente"
}
```

---

## `GET /api/products.csv`

Mesmos query params de `/api/products`. Retorna CSV UTF-8 para importar em planilha / Google Sheets.

### Headers de resposta

| Header | Valor |
|--------|-------|
| `Content-Type` | `text/csv; charset=utf-8` |
| `Content-Disposition` | `attachment; filename="infinityarms-products.csv"` |

### Colunas

```
id,nome,categoria_uso,tipo,marca,calibre,capacidade,preco,preco_parcelado,disponivel,requisito_categoria,url_produto,imagem_url,comprimento_cano,acao,peso,acabamento,descricao
```

### Exemplo

```http
GET https://bot-firearms.vercel.app/api/products.csv
GET https://bot-firearms.vercel.app/api/products.csv?categoria=restrito
```

---

## Integração n8n (Mira)

Fluxo recomendado:

1. **Trigger** WhatsApp (Evolution / webhook)
2. **Agent** interpreta a intenção (ex.: “quanto custa a TH380?”)
3. **HTTP Request** consulta a API antes de responder
4. Agent monta a resposta com `preco`, `disponivel`, `requisito_categoria`, `descricao` e link `url_produto`

### Nó HTTP Request — busca

| Campo | Valor |
|-------|-------|
| Method | `GET` |
| URL | `https://bot-firearms.vercel.app/api/products` |
| Query | `q` = termo extraído da mensagem (ex.: `TH380` ou `GX2`) |
| Query opcional | `categoria` = `permitido` ou `restrito` se a intenção for clara |

### Nó HTTP Request — ficha

| Campo | Valor |
|-------|-------|
| Method | `GET` |
| URL | `https://bot-firearms.vercel.app/api/products/{{ $json.id }}` |

### Campos prioritários para o prompt da Mira

| Campo | Uso no bot |
|-------|------------|
| `preco` | Preço à vista (número real, não decorado no prompt) |
| `preco_parcelado` | Oferta de parcelamento |
| `disponivel` | Confirmar estoque |
| `categoria_uso` | Avisar se é restrito |
| `requisito_categoria` | Ex.: “atirador nível 1, caçador, posse ou porte” / “força de segurança, atirador nível 3 ou caçador” |
| `descricao` | Pitch comercial curto |
| `url_produto` | Enviar link da ficha no site |

### Exemplo de resposta sugerida ao cliente

> A **Pistola Taurus TH380** está por **R$ 7.390** (`12x de R$ 615,83`).  
> Uso **permitido**.  
> Ficha: https://bot-firearms.vercel.app/produto/pistola-taurus-th380

---

## Códigos HTTP

| Código | Quando |
|--------|--------|
| `200` | Sucesso (lista, detalhe ou CSV) |
| `404` | Produto não encontrado em `/api/products/{id}` |

Não há rate limit customizado nesta demo.

---

## Atualizar o catálogo

1. Edite `data/products.json` **ou** rode `npm run import:catalog` (baixa fotos oficiais e regenera o JSON)
2. Faça deploy (push em `main` → Vercel)
3. A API e o site passam a servir os novos valores

Não altere preços só no prompt da Mira — a fonte correta é este JSON / esta API.
