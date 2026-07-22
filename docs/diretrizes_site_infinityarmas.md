# Diretrizes de Construção do Site — InfinityArmas

> Documento complementar ao prompt do agente WhatsApp (Mira). Define como o site deve ser estruturado para que o agente consiga **consultar dados reais nele** em vez de depender de informação fixa dentro do prompt — o que resolve o maior risco de um bot desse tipo: falar preço/estoque desatualizado.

---

## 1. Princípio central: fonte única de verdade

O erro mais comum nesse tipo de projeto é o catálogo existir em dois lugares (o site e o prompt do bot) que vão se desalinhando com o tempo. A recomendação é inverter a lógica:

```
   [Base de dados / planilha / CMS]
              │
      ┌───────┴────────┐
      ▼                ▼
  [Site InfinityArmas]   [Agente WhatsApp / n8n]
   (exibe pro público)    (consulta via API/consulta
                           antes de responder)
```

Nem o site "sabe mais" que o bot, nem o bot "decora" preços — os dois leem da mesma fonte. Isso também facilita a atualização: quem cuida do estoque atualiza em um lugar só.

**Opções de fonte, da mais simples à mais robusta:**

| Opção | Quando faz sentido | Como o n8n consome |
|---|---|---|
| Planilha (Google Sheets) | Fase demo/início, catálogo pequeno, quem atualiza não é técnico | Nó nativo do Google Sheets no n8n |
| CMS headless (ex: builder com API, Strapi, WordPress com REST) | Site já robusto, catálogo maior, precisa de páginas ricas | Nó HTTP Request consumindo a REST API do CMS |
| Banco de dados próprio (Postgres, já usado no seu VPS) | Fase mais madura, quando o CRM entrar | Nó Postgres direto no n8n, mesma base que alimenta o site via backend |

Para a demonstração, **Google Sheets é o ponto de partida mais realista**: rápido de montar, fácil de mostrar ao vivo pro lojista ("veja, mudei o preço aqui e o bot já responde diferente"), e migra depois para banco sem dor.

---

## 2. Estrutura de páginas do site

| Página | Função | Dado que alimenta o bot |
|---|---|---|
| **Home** | Institucional, apresenta loja + clube de tiro | Diferencial (seção 7 do prompt) |
| **Catálogo — Uso Permitido** | Lista de produtos permitidos com specs e preço | Tabela 8.1 do prompt |
| **Catálogo — Uso Restrito** | Lista de produtos restritos, com aviso de que exige categoria compatível | Tabela 8.2 do prompt |
| **Página de produto individual** | Ficha técnica completa (calibre, capacidade, comprimento, ação, peso, acabamento, preço, parcelamento) | Resposta detalhada quando o cliente pergunta de um modelo específico |
| **Como virar CAC / Atirador** | Explica SINARM CAC, níveis, progressão | Seções 2, 3, 5, 6 do prompt |
| **Defesa Pessoal (SINARM Defesa)** | Explica efetiva necessidade, posse x porte | Seção 3 do prompt |
| **Policial / Militar** | Explica dispensa de laudo/teste, limites por categoria | Seções 4 e (nova) tabela de limites profissionais |
| **Clube de Tiro** | Estrutura, calendário de treinos, filiação | Diferencial "tudo em um lugar" |
| **Despachante Parceiro** | Explica que existe o serviço, sem prometer valor | Reforça handoff — nunca lista preço fixo |
| **FAQ** | Perguntas recorrentes (idade mínima, documentos, prazos aproximados) | Reduz perguntas repetidas ao bot |
| **Fale Conosco / WhatsApp** | Ponto de entrada pro próprio bot | — |

> Referência de mercado: sites do setor como o da Cimino's Armas estruturam isso separando claramente "Calibres Permitidos" x "Calibres Restritos" já na navegação principal, e têm página dedicada de "Limites e Quantidades" — essa separação facilita tanto SEO quanto a lógica de consulta do bot.

---

## 3. Modelo de dados do produto (campos mínimos)

Cada item do catálogo (seja na planilha, CMS ou banco) precisa ter, no mínimo:

```
id                  → identificador único (usado pelo bot pra referenciar)
nome                → "Pistola Taurus G2C Preta"
categoria_uso       → "permitido" | "restrito"
tipo                → "pistola" | "revólver" | "rifle" | "carabina" | "espingarda" | "fuzil"
marca               → "Taurus"
calibre             → ".380 ACP", "9mm", "12 GA" etc.
capacidade          → "12+1"
preco               → 4990.00
preco_parcelado     → "12x de R$471,85"
disponivel          → true/false (estoque)
requisito_categoria → "nenhum" | "nível 3" | "caçador excepcional" | "colecionador" | "instituição de segurança"
url_produto         → link da página individual
imagem_url          → link da foto principal
```

Campos `categoria_uso` e `requisito_categoria` são os mais importantes pro bot — é o que permite ele responder corretamente "essa arma é restrita, você já tem o CR compatível?" sem precisar de lógica hardcoded no prompt.

---

## 4. Como o agente consulta o site (integração técnica)

Fluxo recomendado no n8n:

1. **Trigger:** mensagem recebida no WhatsApp (via Evolution API/webhook)
2. **Node de IA (Agent):** interpreta a intenção do cliente (ex: "quanto custa a G2C?")
3. **Tool/Node de consulta:** antes de responder, o agente chama uma ferramenta que consulta a fonte de dados (Google Sheets, API do CMS ou Postgres) filtrando pelo produto/categoria mencionado
4. **Resposta:** o agente monta a resposta com o dado real retornado, não com número decorado no prompt

Isso significa que o **prompt de sistema não deve mais conter preços fixos como estão hoje nas tabelas 8.1/8.2** — aquelas tabelas servem de referência para o demo e para o consultor humano, mas na versão de produção o ideal é que o agente sempre confirme o preço consultando a fonte, e só use as tabelas do prompt como fallback caso a consulta falhe.

**Para a demonstração comercial:** vale mostrar exatamente esse "antes e depois" pro lojista — um preço desatualizado no prompt vs. o bot puxando o dado atualizado da planilha/site em tempo real. É um argumento de venda forte pra quem já sofreu com bot "mentindo" preço.

---

## 5. Conteúdo institucional e avisos legais obrigatórios no site

Baseado no padrão que lojas do setor já adotam (loja autorizada Exército/PF), o site da InfinityArmas deve ter, de forma visível:

- **Verificação de idade na entrada do site** (18+), como barreira antes mesmo de navegar
- **Selo/texto "Loja autorizada pelo Exército Brasileiro e pela Polícia Federal"** em rodapé e página institucional
- **Aviso claro em produtos restritos e permitidos:** "A aquisição de armas, munições e demais produtos controlados somente será efetuada mediante apresentação da documentação exigida por lei"
- **CNPJ e endereço físico completo** no rodapé (transparência e compliance)
- **Política de privacidade e termos de uso** próprios (padrão para qualquer e-commerce, mas aqui reforça a seriedade do setor)
- **Nenhuma venda finalizada 100% online sem validação documental** — mesmo que o site tenha carrinho/checkout, o fluxo deve deixar claro que a confirmação final depende de documentação, análise do consultor e/ou do despachante

---

## 6. SEO e estrutura técnica (para o site ser bem indexado e servir de base confiável)

- Separar claramente as URLs por categoria de uso (ex: `/permitidas/`, `/restritas/`) e por calibre (ex: `/calibre-9mm/`), como referência de mercado já demonstra ser eficaz
- Usar dados estruturados **schema.org/Product** em cada página de produto (nome, preço, disponibilidade, marca) — isso ajuda tanto o Google quanto facilita qualquer integração futura via scraping/API
- Sitemap.xml atualizado automaticamente conforme o catálogo muda
- Página de produto com URL amigável e permanente (evita quebrar links quando o bot referenciar)

---

## 7. Design e tom visual

- Visual sóbrio, profissional, sem apelo a violência — paleta escura/institucional é comum no setor (preto, azul marinho, dourado/prata como detalhe), técnico e confiável, não "tático-agressivo"
- Fotos de produto padronizadas (fundo neutro, mesmo ângulo), como já está no catálogo em PDF da Paiva — reaproveitável
- Hierarquia clara: institucional (quem somos, loja+clube) tem tanto destaque quanto o catálogo, já que é o principal diferencial de vendas
- CTA principal em toda página de produto: "Fale com a Mira no WhatsApp" — reforça que o caminho de conversão é o bot, não um checkout tradicional

---

## 8. Checklist de lançamento

- [ ] Fonte de dados única definida (planilha/CMS/banco) e populada com o catálogo completo (permitido + restrito)
- [ ] Páginas institucionais no ar (CAC, defesa pessoal, policial/militar, clube de tiro, despachante, FAQ)
- [ ] Verificação de idade + avisos legais visíveis
- [ ] CNPJ, endereço e selos de loja autorizada no rodapé
- [ ] Integração n8n → fonte de dados testada (bot consulta e retorna preço/disponibilidade real)
- [ ] Fallback configurado (prompt com tabela de referência) caso a consulta à fonte falhe
- [ ] CTA de WhatsApp presente em todas as páginas de produto
- [ ] Teste de ponta a ponta: alterar um preço na fonte → confirmar que o bot responde com o valor novo em poucos minutos
