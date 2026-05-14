'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { GradientMesh } from '@/components/GradientMesh'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface HeroProps {
  onContactClick: () => void
}

export function Hero({ onContactClick }: HeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToServices = () => {
    const element = document.getElementById('services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen bg-navy pt-16 lg:pt-20">
      {/* Animated Gradient Mesh Background */}
      <GradientMesh />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-4 py-16 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-24">
        {/* Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className={`mb-4 inline-flex items-center gap-2 rounded-full bg-lime/10 px-4 py-2 text-sm font-medium text-lime reveal-init ${mounted ? 'reveal-visible' : ''}`}>
            <CheckCircle className="h-4 w-4" />
            4.9/5 op Werkspot
          </div>

          <h1 className={`mb-6 text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl reveal-init ${mounted ? 'reveal-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
            Vakmanschap voor{' '}
            <span className="text-lime">Uw Renovatie</span>
          </h1>

          <p className={`mx-auto mb-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/70 lg:mx-0 lg:text-xl reveal-init ${mounted ? 'reveal-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            Lambert Afbouw is uw betrouwbare partner voor alle renovatie- en 
            afbouwprojecten. Van keukenrenovatie tot complete bedrijfsverbouwing 
            - wij leveren kwaliteit op maat.
          </p>

          <div className={`flex flex-col items-center gap-4 sm:flex-row lg:justify-start reveal-init ${mounted ? 'reveal-visible' : ''}`} style={{ transitionDelay: '300ms' }}>
            <Button
              onClick={onContactClick}
              size="lg"
              className="w-full bg-lime px-8 py-6 text-base font-semibold text-navy hover:bg-lime-dark sm:w-auto transition-all hover:scale-105 active:scale-95"
            >
              Gratis Offerte Aanvragen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={scrollToServices}
              variant="outline"
              size="lg"
              className="w-full border-white/30 bg-transparent px-8 py-6 text-base font-semibold text-white hover:bg-white/10 sm:w-auto transition-all hover:scale-105 active:scale-95"
            >
              Bekijk Onze Diensten
            </Button>
          </div>

          {/* Trust Badges */}
          <div className={`mt-12 flex flex-wrap items-center justify-center gap-6 lg:justify-start reveal-init ${mounted ? 'reveal-visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-lime" />
              <span className="text-sm text-white/70">Gratis Offerte</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-lime" />
              <span className="text-sm text-white/70">15+ Jaar Ervaring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-lime" />
              <span className="text-sm text-white/70">100% Garantie</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className={`mt-12 flex-1 lg:mt-0 reveal-init ${mounted ? 'reveal-visible' : ''}`} style={{ transitionDelay: '500ms' }}>
          <div className="relative aspect-square max-w-lg overflow-hidden rounded-2xl bg-navy-light lg:aspect-[4/3] shadow-2xl">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/E10EJPJZ-D99n3SqkA15BW258KbjclV2Hg1AIiN.avif"
              alt="Modern gerenoveerd interieur met houten vloer en natuurlijk licht"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
            />
            {/* Overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            {/* Accent corner */}
            <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-tl-2xl bg-lime transition-transform duration-500 hover:scale-110" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={scrollToServices}
          className="flex flex-col items-center gap-2 text-white/50 transition-colors hover:text-lime"
          aria-label="Scroll naar diensten"
        >
          <span className="text-xs uppercase tracking-wider">Ontdek meer</span>
          <div className="h-8 w-5 rounded-full border-2 border-current p-1">
            <div className="h-2 w-1 animate-bounce rounded-full bg-current" />
          </div>
        </button>
      </div>
    </section>
  )
}

