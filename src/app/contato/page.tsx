import type { Metadata } from "next";
import { ContentSection, PageHero } from "@/components/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fale Conosco",
  description: "Fale com a Mira no WhatsApp — atendimento InfinityArms.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Fale com a Mira"
        description="O ponto de entrada do bot WhatsApp. Tire dúvidas de catálogo, CAC e agendamentos."
      />
      <ContentSection>
        <ul className="space-y-3 text-steel">
          <li>
            <span className="text-gold">WhatsApp:</span> {siteConfig.whatsappDisplay}
          </li>
          <li>
            <span className="text-gold">E-mail:</span> {siteConfig.email}
          </li>
          <li>
            <span className="text-gold">Endereço:</span> {siteConfig.address}
          </li>
          <li>
            <span className="text-gold">CNPJ:</span> {siteConfig.cnpj}
          </li>
        </ul>
        <div className="pt-8">
          <WhatsAppCTA />
        </div>
      </ContentSection>
    </>
  );
}
