'use client'

import { services } from '@/lib/validations'
import { GradientMesh } from '@/components/GradientMesh'
import {
  Home,
  Building2,
  HardHat,
  ChefHat,
  Bath,
  Palette,
  Layers,
  PaintBucket,
  Briefcase,
  Store,
  SquareStack,
  DoorOpen,
  PackageOpen,
  Warehouse,
  Hammer,
  Ruler,
} from 'lucide-react'

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

export function ServicesSection({ onServiceClick }: ServicesSectionProps) {
  return (
    <section id="services" className="relative overflow-hidden bg-navy py-16 lg:py-24">
      {/* Animated Gradient Mesh Background */}
      <GradientMesh />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
            Onze <span className="text-lime">Diensten</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-white/70">
            Van kleine renovaties tot complete verbouwingen - wij bieden een 
            breed scala aan professionele diensten voor zowel particuliere als 
            zakelijke klanten.
          </p>
        </div>

        {/* Service Categories */}
        <div className="space-y-12 lg:space-y-16">
          {(Object.entries(services) as [keyof typeof services, typeof services[keyof typeof services]][]).map(
            ([key, category]) => (
              <div key={key}>
                {/* Category Header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime text-navy shadow-lg shadow-lime/25">
                    {categoryIcons[key]}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white lg:text-2xl">
                      {category.title}
                    </h3>
                    <div className="mt-1 h-1 w-16 rounded-full bg-gradient-to-r from-lime to-lime-dark" />
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {category.items.map((service, index) => {
                    const data = serviceData[service] || { icon: <Hammer className="h-7 w-7" />, description: 'Professionele service op maat.' }
                    return (
                      <button
                        key={service}
                        onClick={() => onServiceClick(service)}
                        className="group relative overflow-hidden rounded-2xl bg-white p-8 text-left shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {/* Background gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        
                        {/* Lime accent glow */}
                        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-lime/0 blur-3xl transition-all duration-500 group-hover:bg-lime/30" />
                        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-lime/0 blur-2xl transition-all duration-700 group-hover:bg-lime/20" />
                        
                        {/* Top accent bar */}
                        <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-lime via-lime-dark to-lime opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        
                        <div className="relative flex flex-col gap-5">
                          {/* Icon container */}
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
                          
                          {/* CTA indicator */}
                          <div className="flex items-center gap-2 pt-2">
                            <span className="inline-block h-0.5 w-0 bg-lime transition-all duration-500 group-hover:w-8" />
                            <span className="text-sm font-medium text-lime-dark opacity-0 transition-all duration-300 group-hover:text-lime group-hover:opacity-100 group-hover:translate-x-1">
                              Meer info
                            </span>
                          </div>
                        </div>
                        
                        {/* Bottom corner decoration */}
                        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full border-4 border-lime/0 transition-all duration-500 group-hover:border-lime/30 group-hover:scale-110" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center lg:mt-16">
          <p className="mb-4 text-white/70">
            Niet gevonden wat u zoekt?
          </p>
          <button
            onClick={() => onServiceClick('')}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-lime to-lime-dark px-8 py-4 font-semibold text-navy shadow-lg shadow-lime/25 transition-all duration-300 hover:shadow-xl hover:shadow-lime/30 hover:scale-105"
          >
            Neem contact met ons op
          </button>
        </div>
      </div>
    </section>
  )
}
