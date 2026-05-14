'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useReveal } from '@/hooks/use-reveal'

const faqs = [
  {
    id: '1',
    question: 'Welke soorten projecten voeren jullie uit?',
    answer:
      'Wij verzorgen een breed scala aan renovatie- en afbouwprojecten, waaronder keuken- en badkamerrenovaties, complete interieurverbouwingen, vloerinstallaties, wand- en plafondwerk, kantoorinrichtingen, en commerciële ruimtes. Zowel voor particulieren als zakelijke klanten.',
  },
  {
    id: '2',
    question: 'Hoe lang duurt een gemiddelde renovatie?',
    answer:
      'De doorlooptijd hangt af van de omvang van het project. Een badkamerrenovatie duurt gemiddeld 2-3 weken, een complete keukenrenovatie 3-4 weken. Bij grotere projecten maken we vooraf een gedetailleerde planning die we met u bespreken.',
  },
  {
    id: '3',
    question: 'Bieden jullie ontwerpadvies aan?',
    answer:
      'Ja, wij bieden gratis ontwerpadvies als onderdeel van onze dienstverlening. Onze experts denken graag met u mee over materialen, indelingen en stijlen die passen bij uw wensen en budget.',
  },
  {
    id: '4',
    question: 'In welke regio zijn jullie werkzaam?',
    answer:
      'Wij zijn actief in heel Nederland, met focus op de Randstad. Voor grotere projecten komen we ook daarbuiten. Neem gerust contact op om te bespreken of wij bij u in de buurt kunnen werken.',
  },
  {
    id: '5',
    question: 'Hoe kan ik een gratis offerte aanvragen?',
    answer:
      'U kunt eenvoudig een gratis offerte aanvragen via ons contactformulier op deze pagina, of bel direct met ons team. Wij komen graag vrijblijvend bij u langs om uw wensen te bespreken en een passende offerte te maken.',
  },
]

interface FAQSectionProps {
  onContactClick: () => void
}

export function FAQSection({ onContactClick }: FAQSectionProps) {
  const { ref: headerRef, isVisible: headerVisible } = useReveal()
  const { ref: contentRef, isVisible: contentVisible } = useReveal(0.1)

  return (
    <section id="faq" className="bg-navy py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={headerRef as any}
          className={`mb-12 text-center reveal-init ${headerVisible ? 'reveal-visible' : ''}`}
        >
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
            Veelgestelde <span className="text-lime">Vragen</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-white/70">
            Hier vindt u antwoorden op de meest gestelde vragen. Staat uw vraag 
            er niet bij? Neem gerust contact met ons op.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion 
          ref={contentRef as any}
          type="single" 
          collapsible 
          defaultValue="1" 
          className={`space-y-4 reveal-init ${contentVisible ? 'reveal-visible' : ''}`}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-xl border-0 bg-navy-light px-6 transition-all duration-300 hover:bg-navy-light/80"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <AccordionTrigger className="py-5 text-left text-base font-medium text-white hover:no-underline hover:text-lime [&[data-state=open]>svg]:text-lime">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-white/70">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA */}
        <div 
          className={`mt-12 text-center reveal-init ${contentVisible ? 'reveal-visible' : ''}`}
          style={{ transitionDelay: '500ms' }}
        >
          <p className="mb-4 text-white/70">
            Nog vragen? Wij helpen u graag verder.
          </p>
          <button
            onClick={onContactClick}
            className="inline-flex items-center gap-2 rounded-lg bg-lime px-8 py-3 font-bold text-navy transition-all hover:bg-lime-dark hover:scale-105 active:scale-95 shadow-lg shadow-lime/20"
          >
            Stel uw vraag
          </button>
        </div>
      </div>
    </section>
  )
}

