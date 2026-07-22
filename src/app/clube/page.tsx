import type { Metadata } from "next";
import Image from "next/image";
import { ContentSection, PageHero } from "@/components/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Clube de Tiro",
  description:
    "Clube de tiro InfinityArms — filiação, treinos e estrutura no mesmo endereço da loja.",
};

export default function ClubePage() {
  return (
    <>
      <PageHero
        eyebrow="Estrutura"
        title="Clube de tiro"
        description="Treine, filie-se e resolva a compra no mesmo lugar — o diferencial InfinityArms."
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative aspect-[21/9] overflow-hidden border border-white/10">
          <Image
            src="/catalog/permitidas/page-0010.jpg"
            alt="Estrutura do clube"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
      <ContentSection title="Filiação e treinos">
        <p>
          A filiação ao clube é o primeiro passo para quem busca o CR de atirador.
          Oferecemos orientação de calendário de treinos, modalidades e requisitos
          de frequência (conteúdo demonstrativo).
        </p>
        <p>
          Fale com a Mira para agendar uma visita ou tirar dúvidas sobre
          filiação.
        </p>
        <div className="pt-6">
          <WhatsAppCTA />
        </div>
      </ContentSection>
    </>
  );
}
