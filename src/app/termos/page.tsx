import type { Metadata } from "next";
import { ContentSection, PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Termos de Uso" };

export default function TermosPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Termos de uso"
        description="Condições de uso do site demonstrativo InfinityArms."
      />
      <ContentSection>
        <p>
          Este site é uma demonstração comercial. Preços, estoque e dados
          cadastrais são simulados. A aquisição de produtos controlados exige
          documentação legal e não se conclui exclusivamente online.
        </p>
        <p>
          É proibido o uso do conteúdo por menores de 18 anos. Ao continuar, você
          declara ter idade legal.
        </p>
        <p>
          {siteConfig.legalNotice}
        </p>
      </ContentSection>
    </>
  );
}
