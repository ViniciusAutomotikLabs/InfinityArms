import type { Metadata } from "next";
import { ContentSection, PageHero } from "@/components/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Como virar CAC / Atirador",
  description:
    "Entenda SINARM CAC, níveis de atirador e o caminho para adquirir armas legalmente.",
};

export default function CacPage() {
  return (
    <>
      <PageHero
        eyebrow="Orientação"
        title="Como virar CAC / Atirador"
        description="O Certificado de Registro (CR) no SINARM habilita o cidadão a adquirir armas de fogo na categoria de caçador, atirador desportivo ou colecionador."
      />
      <ContentSection title="Visão geral">
        <p>
          O processo envolve filiação a um clube de tiro, avaliação psicológica e
          de capacidade técnica, documentação pessoal e protocolo junto à Polícia
          Federal / Exército, conforme a categoria pretendida.
        </p>
        <p>
          Os níveis de atirador (1 a 3, e progressões específicas) influenciam
          limites de quantidade e calibres — inclusive o acesso a produtos de uso
          restrito.
        </p>
      </ContentSection>
      <ContentSection title="Passos típicos">
        <ol className="list-decimal space-y-3 pl-5">
          <li>Filiação a um clube de tiro credenciado.</li>
          <li>Laudos e testes exigidos pela legislação vigente.</li>
          <li>Requerimento do CR e emissão do título de registro.</li>
          <li>Aquisição em loja autorizada com documentação completa.</li>
        </ol>
        <p className="pt-4">
          Esta página é informativa (demo). A Mira no WhatsApp orienta o fluxo e
          encaminha ao despachante parceiro quando necessário.
        </p>
        <div className="pt-6">
          <WhatsAppCTA />
        </div>
      </ContentSection>
    </>
  );
}
