import type { Metadata } from "next";
import { ContentSection, PageHero } from "@/components/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Despachante Parceiro",
  description:
    "Serviço de despachante parceiro para trâmites documentais — valores sob consulta.",
};

export default function DespachantePage() {
  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title="Despachante parceiro"
        description="Apoiamos o fluxo documental com despachante parceiro. Não listamos preço fixo no site — cada caso é orçado sob consulta."
      />
      <ContentSection title="O que cobre">
        <p>
          Orientação e acompanhamento de protocolos relacionados a CR, guias e
          demais trâmites junto aos órgãos competentes, conforme a necessidade do
          cliente.
        </p>
        <p>
          A Mira faz o handoff: identifica a necessidade e conecta você ao
          atendimento humano / despachante, sem prometer valor fechado no chat.
        </p>
        <div className="pt-6">
          <WhatsAppCTA />
        </div>
      </ContentSection>
    </>
  );
}
