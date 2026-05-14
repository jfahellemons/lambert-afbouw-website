'use client'

import { useReveal } from '@/hooks/use-reveal'
import { services } from '@/lib/validations'
import useEmblaCarousel from 'embla-carousel-react'
import {
  Bath,
  Briefcase,
  Building2,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  DoorOpen,
  Hammer,
  HardHat,
  Home,
  Layers,
  PackageOpen,
  PaintBucket,
  Palette,
  Ruler,
  SquareStack,
  Store,
  Warehouse,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

interface ServicesSectionProps {
  onServiceClick: (service: string) => void
}

const serviceData: Record<string, { icon: React.ReactNode; description: string }> = {
  // Residential
  'Keukenrenovatie': { 
    icon: <ChefHat className="h-7 w-7" />, 
    description: 'Moderne keukens op maat met hoogwaardige materialen en slimme opslag.' 
  },
  'Badkamerrenovatie': { 
    icon: <Bath className="h-7 w-7" />, 
    description: 'Luxe badkamers met stijlvolle tegels, sanitair en wellness-elementen.' 
  },
  'Interieur Herontwerp': { 
    icon: <Palette className="h-7 w-7" />, 
    description: 'Complete interieur make-overs die uw ruimte transformeren.' 
  },
  'Vloerinstallatie': { 
    icon: <Layers className="h-7 w-7" />, 
    description: 'Van laminaat tot natuursteen - perfecte vloeren voor elke ruimte.' 
  },
  'Wand- & Plafondwerk': { 
    icon: <PaintBucket className="h-7 w-7" />, 
    description: 'Strakke wanden en plafonds met professionele afwerking.' 
  },
  // Commercial
  'Kantoorinrichting': { 
    icon: <Briefcase className="h-7 w-7" />, 
    description: 'Functionele werkplekken die productiviteit en welzijn bevorderen.' 
  },
  'Winkelruimte Ontwerp': { 
    icon: <Store className="h-7 w-7" />, 
    description: 'Aantrekkelijke winkelinterieurs die klanten inspireren.' 
  },
  'Commerciële Vloeren': { 
    icon: <SquareStack className="h-7 w-7" />, 
    description: 'Duurzame vloeroplossingen voor intensief commercieel gebruik.' 
  },
  'Wandafscheidingen': { 
    icon: <DoorOpen className="h-7 w-7" />, 
    description: 'Flexibele ruimte-indeling met moderne scheidingswanden.' 
  },
  'Maatwerk Kasten': { 
    icon: <PackageOpen className="h-7 w-7" />, 
    description: 'Op maat gemaakte opbergoplossingen voor optimaal ruimtegebruik.' 
  },
  // Structural
  'Funderingsherstel': { 
    icon: <Warehouse className="h-7 w-7" />, 
    description: 'Professioneel funderingsherstel voor een stabiele basis.' 
  },
  'Dragende Muur Werkzaamheden': { 
    icon: <Hammer className="h-7 w-7" />, 
    description: 'Veilige aanpassingen aan dragende constructies door experts.' 
  },
  'Dakreparatie & Installatie': { 
    icon: <Home className="h-7 w-7" />, 
    description: 'Complete dakoplossingen van reparatie tot volledige vervanging.' 
  },
  'Gevelrenovatie': { 
    icon: <Ruler className="h-7 w-7" />, 
    description: 'Herstel en verfraaiing van uw gevel voor een frisse uitstraling.' 
  },
}

const categoryIcons: Record<string, React.ReactNode> = {
  residential: <Home className="h-6 w-6" />,
  commercial: <Building2 className="h-6 w-6" />,
  structural: <HardHat className="h-6 w-6" />,
}

function ServiceSlider({ 
  items, 
  catIndex, 
  contentVisible, 
  onServiceClick 
}: { 
  items: string[], 
  catIndex: number, 
  contentVisible: boolean,
  onServiceClick: (service: string) => void
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    slidesToScroll: 1,
    containScroll: 'trimSnaps'
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative group/slider">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 py-4">
          {items.map((service, index) => {
            const data = serviceData[service] || { icon: <Hammer className="h-7 w-7" />, description: 'Professionele service op maat.' }
            return (
              <div 
                key={service} 
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
              >
                <button
                  onClick={() => onServiceClick(service)}
                  className={`w-full group relative overflow-hidden rounded-2xl bg-white p-8 text-left shadow-soft transition-all duration-500 hover:-translate-y-3 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 reveal-init ${contentVisible ? 'reveal-visible' : ''}`}
                  style={{ transitionDelay: `${(catIndex * 150) + (index * 50)}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-lime/0 blur-3xl transition-all duration-500 group-hover:bg-lime/30" />
                  <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-lime via-lime-dark to-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative flex flex-col gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-navy-light text-white shadow-lg shadow-navy/20 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-lime group-hover:to-lime-dark group-hover:text-navy group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-lime/30 group-hover:rotate-3">
                      {data.icon}
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-navy transition-colors duration-300 group-hover:text-white">
                        {service}
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-white/70">
                        {data.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2">
                      <span className="inline-block h-0.5 w-0 bg-lime transition-all duration-500 group-hover:w-8" />
                      <span className="text-sm font-medium text-lime-dark opacity-0 transition-all duration-300 group-hover:text-lime group-hover:opacity-100 group-hover:translate-x-1">
                        Meer info
                      </span>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full border-4 border-lime/0 transition-all duration-500 group-hover:border-lime/30 group-hover:scale-110" />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Buttons - Only show if there are many items or if they are scrollable */}
      {items.length > 3 && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-all hover:bg-navy hover:text-white disabled:opacity-0 group-hover/slider:opacity-100 lg:opacity-0"
            aria-label="Vorige diensten"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className="absolute -right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-all hover:bg-navy hover:text-white disabled:opacity-0 group-hover/slider:opacity-100 lg:opacity-0"
            aria-label="Volgende diensten"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  )
}

export function ServicesSection({ onServiceClick }: ServicesSectionProps) {
  const { ref: headerRef, isVisible: headerVisible } = useReveal()
  const { ref: contentRef, isVisible: contentVisible } = useReveal(0.05)

  return (
    <section id="services" className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={headerRef as any}
          className={`mb-12 text-center lg:mb-16 reveal-init ${headerVisible ? 'reveal-visible' : ''}`}
        >
          <h2 className="mb-4 text-3xl font-bold text-navy lg:text-4xl">
            Onze <span className="text-lime-dark">Diensten</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Van kleine renovaties tot complete verbouwingen - wij bieden een 
            breed scala aan professionele diensten voor zowel particuliere als 
            zakelijke klanten.
          </p>
        </div>

        {/* Service Categories */}
        <div ref={contentRef as any} className="space-y-12 lg:space-y-16">
          {(Object.entries(services) as [keyof typeof services, typeof services[keyof typeof services]][]).map(
            ([key, category], catIndex) => (
              <div 
                key={key}
                className={`reveal-init ${contentVisible ? 'reveal-visible' : ''}`}
                style={{ transitionDelay: `${catIndex * 150}ms` }}
              >
                {/* Category Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-white">
                      {categoryIcons[key]}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-navy lg:text-2xl">
                        {category.title}
                      </h3>
                      <div className="mt-1 h-1 w-16 rounded-full bg-lime" />
                    </div>
                  </div>
                </div>

                {/* Services Slider */}
                <ServiceSlider 
                  items={category.items.slice(0, 3) as any} 
                  catIndex={catIndex} 
                  contentVisible={contentVisible}
                  onServiceClick={onServiceClick}
                />
              </div>
            )
          )}
        </div>

        {/* CTA */}
        <div 
          className={`mt-12 text-center lg:mt-16 reveal-init ${contentVisible ? 'reveal-visible' : ''}`}
          style={{ transitionDelay: '600ms' }}
        >
          <p className="mb-4 text-muted-foreground">
            Niet gevonden wat u zoekt?
          </p>
          <button
            onClick={() => onServiceClick('')}
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-8 py-3 font-medium text-white transition-all hover:bg-navy-light hover:scale-105 active:scale-95"
          >
            Neem contact met ons op
          </button>
        </div>
      </div>
    </section>
  )
}

