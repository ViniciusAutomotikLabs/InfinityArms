export const siteConfig = {
  name: "InfinityArms",
  tagline: "Loja de armas e clube de tiro em um só lugar",
  description:
    "Site demonstrativo InfinityArms — catálogo de armas de uso permitido e restrito, orientação CAC e atendimento via Mira no WhatsApp.",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5561999990000",
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY || "(61) 99999-0000",
  email: "contato@infinityarms.demo",
  cnpj: "00.000.000/0001-00",
  address: "Quadra Demo, Lote 1, Loja 1 — Setor Sul — Brasília/DF",
  authorization:
    "Loja autorizada pelo Exército Brasileiro e pela Polícia Federal (demonstração)",
  legalNotice:
    "A aquisição de armas, munições e demais produtos controlados somente será efetuada mediante apresentação da documentação exigida por lei.",
};

export function whatsappUrl(message?: string) {
  const text =
    message ||
    "Olá Mira! Vim pelo site da InfinityArms e gostaria de mais informações.";
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });
}
