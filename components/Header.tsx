'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Phone, Menu, X } from 'lucide-react'

interface HeaderProps {
  onContactClick: () => void
}

export function Header({ onContactClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-navy lg:text-2xl">
              Lambert<span className="text-lime">Afbouw</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium text-navy transition-colors hover:text-lime-dark"
            >
              Diensten
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-sm font-medium text-navy transition-colors hover:text-lime-dark"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-sm font-medium text-navy transition-colors hover:text-lime-dark"
            >
              FAQ
            </button>
            <Button
              onClick={onContactClick}
              className="bg-lime text-navy hover:bg-lime-dark"
            >
              <Phone className="mr-2 h-4 w-4" />
              Neem Contact Op
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-navy md:hidden"
            aria-label={isMobileMenuOpen ? 'Sluit menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="border-t border-border bg-white pb-4 md:hidden">
            <div className="flex flex-col gap-4 pt-4">
              <button
                onClick={() => scrollToSection('services')}
                className="px-4 py-2 text-left text-sm font-medium text-navy transition-colors hover:text-lime-dark"
              >
                Diensten
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="px-4 py-2 text-left text-sm font-medium text-navy transition-colors hover:text-lime-dark"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="px-4 py-2 text-left text-sm font-medium text-navy transition-colors hover:text-lime-dark"
              >
                FAQ
              </button>
              <div className="px-4">
                <Button
                  onClick={() => {
                    onContactClick()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full bg-lime text-navy hover:bg-lime-dark"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Neem Contact Op
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
