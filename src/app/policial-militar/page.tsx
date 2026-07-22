import type { Metadata } from "next";
import { ContentSection, PageHero } from "@/components/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Policial / Militar",
  description:
    "Informações para profissionais de segurança: dispensas, limites e categorias.",
};

export default function PolicialMilitarPage() {
  return (
    <>
      <PageHero
        eyebrow="Profissionais"
        title="Policial / Militar"
        description="Profissionais de instituições de segurança possuem regras específicas de aquisição e limites por categoria."
      />
      <ContentSection title="O que muda">
        <p>
          Em muitos casos há dispensa de laudo psicológico/teste de tiro exigidos
          de civis CAC, ou procedimentos simplificados — sempre conforme a
          legislação e normas internas da instituição.
        </p>
        <p>
          Limites de quantidade e tipo de armamento variam. A Mira consulta o
          catálogo e encaminha o atendimento humano quando a regra institucional
          precisa ser confirmada.
        </p>
        <div className="pt-6">
          <WhatsAppCTA />
        </div>
      </ContentSection>
    </>
  );
}
