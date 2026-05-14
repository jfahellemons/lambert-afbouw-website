'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ContactModal } from '@/components/ContactModal'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectDetailModal } from '@/components/ProjectDetailModal'
import { projects, Project } from '@/lib/projects-data'
import { Button } from '@/components/ui/button'
import { GradientMesh } from '@/components/GradientMesh'

const categories = ['Alle', 'Woningrenovatie', 'Commerciële Projecten', 'Constructiewerk']

export default function ProjectsPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeCategory, setActiveCategory] = useState('Alle')

  const handleOpenContactModal = (service: string = '') => {
    setSelectedService(service)
    setIsContactModalOpen(true)
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  // Filter logic: map project service back to category title from validations if needed, 
  // but for simplicity, we'll just check if the service is in the category's items.
  // Actually, for this MVP, I'll just filter by a manually mapped category or just use the service types.
  const filteredProjects = projects.filter(project => {
    if (activeCategory === 'Alle') return true
    
    // Check which top-level category the project's service belongs to
    // In a real app, this would be more robust.
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
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
              Onze <span className="text-lime">Projecten</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Ontdek ons vakmanschap in actie. Van particuliere woningrenovaties tot 
              grootschalige commerciële projecten, wij leveren kwaliteit die spreekt.
            </p>
          </div>
        </section>

        {/* Filters and Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Category Filters */}
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-6 transition-all duration-300 ${
                    activeCategory === category 
                      ? 'bg-lime text-navy hover:bg-lime-dark' 
                      : 'border-gray-200 text-navy hover:border-lime hover:text-lime-dark'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Project Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={handleProjectClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-gray text-lg">Geen projecten gevonden in deze categorie.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-light py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-navy mb-6">Heeft u een vergelijkbaar project?</h2>
            <p className="mb-10 text-lg text-gray-dark max-w-2xl mx-auto">
              Neem vandaag nog contact met ons op voor een vrijblijvende offerte en 
              advies op maat voor uw renovatie- of afbouwproject.
            </p>
            <Button
              onClick={() => handleOpenContactModal()}
              size="lg"
              className="bg-lime text-navy hover:bg-lime-dark px-10 h-14 text-lg font-bold rounded-full shadow-lg shadow-lime/20"
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
