'use client'

import { services } from '@/lib/validations'
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

const serviceIcons: Record<string, React.ReactNode> = {
  // Residential
  'Keukenrenovatie': <ChefHat className="h-6 w-6" />,
  'Badkamerrenovatie': <Bath className="h-6 w-6" />,
  'Interieur Herontwerp': <Palette className="h-6 w-6" />,
  'Vloerinstallatie': <Layers className="h-6 w-6" />,
  'Wand- & Plafondwerk': <PaintBucket className="h-6 w-6" />,
  // Commercial
  'Kantoorinrichting': <Briefcase className="h-6 w-6" />,
  'Winkelruimte Ontwerp': <Store className="h-6 w-6" />,
  'Commerciële Vloeren': <SquareStack className="h-6 w-6" />,
  'Wandafscheidingen': <DoorOpen className="h-6 w-6" />,
  'Maatwerk Kasten': <PackageOpen className="h-6 w-6" />,
  // Structural
  'Funderingsherstel': <Warehouse className="h-6 w-6" />,
  'Dragende Muur Werkzaamheden': <Hammer className="h-6 w-6" />,
  'Dakreparatie & Installatie': <Home className="h-6 w-6" />,
  'Gevelrenovatie': <Ruler className="h-6 w-6" />,
}

const categoryIcons: Record<string, React.ReactNode> = {
  residential: <Home className="h-6 w-6" />,
  commercial: <Building2 className="h-6 w-6" />,
  structural: <HardHat className="h-6 w-6" />,
}

export function ServicesSection({ onServiceClick }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
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
        <div className="space-y-12 lg:space-y-16">
          {(Object.entries(services) as [keyof typeof services, typeof services[keyof typeof services]][]).map(
            ([key, category]) => (
              <div key={key}>
                {/* Category Header */}
                <div className="mb-6 flex items-center gap-3">
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

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {category.items.map((service) => (
                    <button
                      key={service}
                      onClick={() => onServiceClick(service)}
                      className="group flex items-start gap-4 rounded-xl bg-white p-5 text-left shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-navy transition-colors group-hover:bg-lime group-hover:text-navy">
                        {serviceIcons[service] || <Hammer className="h-6 w-6" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-navy group-hover:text-lime-dark">
                          {service}
                        </h4>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Klik voor meer info
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center lg:mt-16">
          <p className="mb-4 text-muted-foreground">
            Niet gevonden wat u zoekt?
          </p>
          <button
            onClick={() => onServiceClick('')}
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-medium text-white transition-colors hover:bg-navy-light"
          >
            Neem contact met ons op
          </button>
        </div>
      </div>
    </section>
  )
}
