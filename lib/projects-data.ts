import { allServices } from './validations'

export interface Project {
  id: string
  title: string
  service: string
  description: string
  imageUrl: string
  location?: string
  duration?: string
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Luxe Keukenrenovatie Amsterdam',
    service: 'Keukenrenovatie',
    description: 'Een complete transformatie van een verouderde keuken naar een moderne, functionele ruimte. We hebben hoogwaardige materialen gebruikt, waaronder marmeren bladen en op maat gemaakte kasten, gecombineerd met de nieuwste inbouwapparatuur.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15224bbbe39?q=80&w=2070&auto=format&fit=crop',
    location: 'Amsterdam',
    duration: '3 weken',
  },
  {
    id: '2',
    title: 'Moderne Badkamer Loft',
    service: 'Badkamerrenovatie',
    description: 'Renovatie van een badkamer in een industriële loft. Voorzien van een inloopdouche met regendouche, vrijstaand bad en betonlook stucwerk voor een strakke, moderne uitstraling.',
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1974&auto=format&fit=crop',
    location: 'Rotterdam',
    duration: '2 weken',
  },
  {
    id: '3',
    title: 'Kantoorinrichting Tech Start-up',
    service: 'Kantoorinrichting',
    description: 'Ontwerp en realisatie van een inspirerende werkomgeving voor een groeiend tech-bedrijf. Inclusief geluiddichte belcellen, open werkplekken en een sfeervolle kantine.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    location: 'Utrecht',
    duration: '6 weken',
  },
  {
    id: '4',
    title: 'Visgraat Vloer Herenhuis',
    service: 'Vloerinstallatie',
    description: 'Vakkundige installatie van een klassieke eikenhouten visgraatvloer in een historisch herenhuis. De vloer is afgewerkt met een matte olie voor een natuurlijke uitstraling en maximale duurzaamheid.',
    imageUrl: 'https://images.unsplash.com/photo-1581850518616-bcb81f0cb89b?q=80&w=2070&auto=format&fit=crop',
    location: 'Haarlem',
    duration: '1 week',
  },
  {
    id: '5',
    title: 'Winkelrenovatie Concept Store',
    service: 'Winkelruimte Ontwerp',
    description: 'Complete afbouw van een nieuwe concept store in het stadscentrum. Van modulaire wandsystemen tot de volledige verlichtingsinstallatie, alles gericht op een optimale klantbeleving.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    location: 'Leiden',
    duration: '4 weken',
  },
  {
    id: '6',
    title: 'Gevelrenovatie Monumentaal Pand',
    service: 'Gevelrenovatie',
    description: 'Restauratie en renovatie van de gevel van een monumentaal pand. Herstel van authentiek voegwerk en reiniging van het metselwerk om het pand in zijn oude glorie te herstellen.',
    imageUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2070&auto=format&fit=crop',
    location: 'Den Haag',
    duration: '5 weken',
  },
]
