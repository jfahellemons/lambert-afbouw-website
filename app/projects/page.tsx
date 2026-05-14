'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactModal } from '@/components/ContactModal'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectDetailModal } from '@/components/ProjectDetailModal'
import { projects, Project } from '@/lib/projects-data'
import { Button } from '@/components/ui/button'
import { GradientMesh } from '@/components/GradientMesh'
import { useReveal } from '@/hooks/use-reveal'

const categories = ['Alle', 'Woningrenovatie', 'Commerciële Projecten', 'Constructiewerk']

export default function ProjectsPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeCategory, setActiveCategory] = useState('Alle')
  const [mounted, setMounted] = useState(false)

  const { ref: filterRef, isVisible: filterVisible } = useReveal()
  const { ref: gridRef, isVisible: gridVisible } = useReveal(0.05)
  const { ref: ctaRef, isVisible: ctaVisible } = useReveal()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleOpenContactModal = (service: string = '') => {
    setSelectedService(service)
    setIsContactModalOpen(true)
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const filteredProjects = projects.filter(project => {
    if (activeCategory === 'Alle') return true
    if (activeCategory === 'Woningrenovatie') {
        return ['Keukenrenovatie', 'Badkamerrenovatie', 'Interieur Herontwerp', 'Vloerinstallatie', 'Wand- & Plafondwerk'].includes(project.service)
    }
    if (activeCategory === 'Commerciële Projecten') {
        return ['Kantoorinrichting', 'Winkelruimte Ontwerp', 'Commerciële Vloeren', 'Wandafscheidingen', 'Maatwerk Kasten'].includes(project.service)
    }
    if (activeCategory === 'Constructiewerk') {
        return ['Funderingsherstel', 'Dragende Muur Werkzaamheden', 'Dakreparatie & Installatie', 'Gevelrenovatie'].includes(project.service)
    }
    return false
  })

  return (
    <div className="min-h-screen bg-white">
      <Header onContactClick={() => handleOpenContactModal()} />
      
      <main>
        {/* Hero Section for Projects */}
        <section className="relative bg-navy pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
          <GradientMesh />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className={`text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6 reveal-init ${mounted ? 'reveal-visible' : ''}`}>
              Onze <span className="text-lime">Projecten</span>
            </h1>
            <p className={`mx-auto max-w-2xl text-lg text-white/70 reveal-init ${mounted ? 'reveal-visible' : ''}`} style={{ transitionDelay: '100ms' }}>
              Ontdek ons vakmanschap in actie. Van particuliere woningrenovaties tot 
              grootschalige commerciële projecten, wij leveren kwaliteit die spreekt.
            </p>
          </div>
        </section>

        {/* Filters and Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Category Filters */}
            <div 
              ref={filterRef as any}
              className={`mb-12 flex flex-wrap justify-center gap-3 reveal-init ${filterVisible ? 'reveal-visible' : ''}`}
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-6 transition-all duration-300 hover:scale-105 active:scale-95 ${
                    activeCategory === category 
                      ? 'bg-navy text-white hover:bg-navy-light' 
                      : 'border-gray-200 text-navy hover:border-lime hover:text-lime-dark'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Project Grid */}
            <div ref={gridRef as any}>
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProjects.map((project, index) => (
                    <div 
                      key={project.id}
                      className={`reveal-init ${gridVisible ? 'reveal-visible' : ''}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <ProjectCard 
                        project={project} 
                        onClick={handleProjectClick} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-gray text-lg">Geen projecten gevonden in deze categorie.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          ref={ctaRef as any}
          className="bg-secondary py-16 lg:py-24"
        >
          <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center reveal-init ${ctaVisible ? 'reveal-visible' : ''}`}>
            <h2 className="text-3xl font-bold text-navy mb-6">Heeft u een vergelijkbaar project?</h2>
            <p className="mb-10 text-lg text-muted-foreground max-w-2xl mx-auto">
              Neem vandaag nog contact met ons op voor een vrijblijvende offerte en 
              advies op maat voor uw renovatie- of afbouwproject.
            </p>
            <Button
              onClick={() => handleOpenContactModal()}
              size="lg"
              className="bg-lime text-navy hover:bg-lime-dark px-10 h-14 text-lg font-bold rounded-full shadow-lg shadow-lime/20 transition-all hover:scale-105 active:scale-95"
            >
              Start Uw Project
            </Button>
          </div>
        </section>
      </main>
      
      <Footer onContactClick={() => handleOpenContactModal()} />
      
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        preselectedService={selectedService}
      />

      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onContactClick={handleOpenContactModal}
      />
    </div>
  )
}

