import type { Metadata } from "next";
import { ContentSection, PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Política de privacidade"
        description="Como tratamos dados neste site demonstrativo."
      />
      <ContentSection>
        <p>
          A {siteConfig.name} (demo) coleta apenas dados necessários ao
          atendimento (ex.: mensagens via WhatsApp). Não vendemos dados pessoais.
        </p>
        <p>
          Cookies locais podem ser usados para lembrar a verificação de idade
          (18+). Ao sair do site para o WhatsApp, aplicam-se as políticas da
          Meta/WhatsApp.
        </p>
        <p>
          Contato do responsável demo: {siteConfig.email}.
        </p>
      </ContentSection>
    </>
  );
}
