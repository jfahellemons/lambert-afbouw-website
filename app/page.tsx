'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ServicesSection } from '@/components/ServicesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { FAQSection } from '@/components/FAQSection'
import { Footer } from '@/components/Footer'
import { ContactModal } from '@/components/ContactModal'

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')

  const handleOpenContactModal = (service: string = '') => {
    setSelectedService(service)
    setIsContactModalOpen(true)
  }

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false)
    setSelectedService('')
  }

  return (
    <>
      <Header onContactClick={() => handleOpenContactModal()} />
      
      <main>
        <Hero onContactClick={() => handleOpenContactModal()} />
        <ServicesSection onServiceClick={handleOpenContactModal} />
        <TestimonialsSection />
        <FAQSection onContactClick={() => handleOpenContactModal()} />
      </main>
      
      <Footer onContactClick={() => handleOpenContactModal()} />
      
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        preselectedService={selectedService}
      />
    </>
  )
}
