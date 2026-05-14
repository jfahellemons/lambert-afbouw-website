'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Phone, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  onContactClick: () => void
}

export function Header({ onContactClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (pathname === '/') {
      e.preventDefault()
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { name: 'Projecten', href: '/projects', isScroll: false },
    { name: 'Diensten', href: '/#services', isScroll: true, id: 'services' },
    { name: 'Reviews', href: '/#testimonials', isScroll: true, id: 'testimonials' },
    { name: 'FAQ', href: '/#faq', isScroll: true, id: 'faq' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/95 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/"
              className={`text-xl font-bold lg:text-2xl transition-colors duration-300 ${
                isScrolled || isMobileMenuOpen ? 'text-navy' : 'text-white'
              }`}
            >
              Lambert<span className="text-lime">Afbouw</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => link.isScroll && scrollToSection(e, link.id!)}
                className={`text-sm font-medium transition-colors hover:text-lime-dark ${
                  isScrolled || isMobileMenuOpen ? 'text-navy' : 'text-white'
                } ${pathname === link.href ? 'text-lime-dark' : ''}`}
              >
                {link.name}
              </Link>
            ))}
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
            className={`md:hidden transition-colors ${
              isScrolled || isMobileMenuOpen ? 'text-navy' : 'text-white'
            }`}
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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => link.isScroll && scrollToSection(e, link.id!)}
                  className="px-4 py-2 text-left text-sm font-medium text-navy transition-colors hover:text-lime-dark"
                >
                  {link.name}
                </Link>
              ))}
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

