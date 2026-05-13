'use client'

import { MapPin, Phone, Mail, Clock } from 'lucide-react'

interface FooterProps {
  onContactClick: () => void
}

export function Footer({ onContactClick }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-navy-light">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="text-2xl font-bold text-white">
              Lambert<span className="text-lime">Afbouw</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Uw betrouwbare partner voor alle renovatie- en afbouwprojecten. 
              Met meer dan 15 jaar ervaring leveren wij kwaliteit op maat.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Snelle Links
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm text-white/60 transition-colors hover:text-lime"
                >
                  Onze Diensten
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-sm text-white/60 transition-colors hover:text-lime"
                >
                  Klantreviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-sm text-white/60 transition-colors hover:text-lime"
                >
                  Veelgestelde Vragen
                </button>
              </li>
              <li>
                <button
                  onClick={onContactClick}
                  className="text-sm text-white/60 transition-colors hover:text-lime"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Diensten
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-white/60">Keukenrenovatie</span>
              </li>
              <li>
                <span className="text-sm text-white/60">Badkamerrenovatie</span>
              </li>
              <li>
                <span className="text-sm text-white/60">Kantoorinrichting</span>
              </li>
              <li>
                <span className="text-sm text-white/60">Vloerinstallatie</span>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm font-medium text-lime transition-colors hover:text-lime-dark"
                >
                  Alle diensten bekijken
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <span className="text-sm text-white/60">
                  Industrieweg 123
                  <br />
                  1234 AB Amsterdam
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-lime" />
                <a
                  href="tel:+31201234567"
                  className="text-sm text-white/60 transition-colors hover:text-lime"
                >
                  +31 20 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-lime" />
                <a
                  href="mailto:info@lambertafbouw.nl"
                  className="text-sm text-white/60 transition-colors hover:text-lime"
                >
                  info@lambertafbouw.nl
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                <span className="text-sm text-white/60">
                  Ma - Vr: 08:00 - 18:00
                  <br />
                  Za: Op afspraak
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/60">
              &copy; {currentYear} Lambert Afbouw. Alle rechten voorbehouden.
            </p>
            <div className="flex items-center gap-6">
              <button className="text-sm text-white/60 transition-colors hover:text-lime">
                Privacybeleid
              </button>
              <button className="text-sm text-white/60 transition-colors hover:text-lime">
                Algemene Voorwaarden
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
