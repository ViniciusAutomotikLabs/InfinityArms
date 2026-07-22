import type { Metadata } from "next";
import { ContentSection, PageHero } from "@/components/PageHero";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Perguntas frequentes sobre compra de armas, CAC e atendimento.",
};

const faqs = [
  {
    q: "Qual a idade mínima?",
    a: "A aquisição de armas de fogo é restrita a maiores de 18 anos, observadas as demais exigências legais e de categoria.",
  },
  {
    q: "Posso comprar 100% online?",
    a: "Não. O site é demonstrativo e o fluxo real exige documentação, análise e confirmação presencial/consultor. A Mira inicia o atendimento pelo WhatsApp.",
  },
  {
    q: "Qual a diferença entre permitido e restrito?",
    a: "Calibres e modelos de uso restrito exigem CR com categoria compatível (ex.: nível 3). Produtos permitidos seguem regras de calibre permitido.",
  },
  {
    q: "Os preços do site são finais?",
    a: "Nesta demo os preços são simulados/arredondados. Em produção, a Mira consulta a mesma tabela da API antes de responder.",
  },
  {
    q: "Quanto tempo leva o CR?",
    a: "Prazos variam conforme documentação, filiação e órgão responsável. A Mira e o despachante parceiro orientam o caso concreto.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Ajuda"
        title="Perguntas frequentes"
        description="Respostas rápidas para as dúvidas mais comuns. Para o seu caso, fale com a Mira."
      />
      <ContentSection>
        <div className="space-y-6">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group border border-white/10 bg-navy-900/40 open:border-gold/30"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-display text-xl text-white marker:content-none">
                {item.q}
              </summary>
              <p className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-steel">
                {item.a}
              </p>
            </details>
          ))}
        </div>
        <div className="pt-10">
          <WhatsAppCTA />
        </div>
      </ContentSection>
    </>
  );
}
