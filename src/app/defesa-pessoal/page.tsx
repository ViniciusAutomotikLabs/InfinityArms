import type { Metadata } from "next";
import { ContentSection, PageHero } from "@/components/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Defesa Pessoal (SINARM Defesa)",
  description:
    "Entenda posse, porte e a efetiva necessidade no SINARM Defesa.",
};

export default function DefesaPessoalPage() {
  return (
    <>
      <PageHero
        eyebrow="Orientação"
        title="Defesa pessoal"
        description="A categoria de defesa pessoal no SINARM possui requisitos próprios, distintos do CAC desportivo."
      />
      <ContentSection title="Posse x porte">
        <p>
          <strong className="text-white">Posse</strong> refere-se à guarda da arma
          no domicílio ou local de trabalho autorizado.{" "}
          <strong className="text-white">Porte</strong> é a autorização excepcional
          para circular armado — sujeita a critérios rigorosos de efetiva
          necessidade.
        </p>
        <p>
          A análise de efetiva necessidade considera risco concreto à integridade
          física, atividade profissional e outros elementos previstos em lei e
          regulamentação.
        </p>
      </ContentSection>
      <ContentSection title="Como a InfinityArms ajuda">
        <p>
          Orientamos sobre documentação e calibres permitidos para defesa,
          sempre deixando claro que a decisão final é da autoridade competente.
          Não há venda online finalizada sem validação documental.
        </p>
        <div className="pt-6">
          <WhatsAppCTA />
        </div>
      </ContentSection>
    </>
  );
}
