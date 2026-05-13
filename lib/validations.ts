import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Naam moet minimaal 2 tekens bevatten'),
  email: z.string().email('Ongeldig e-mailadres'),
  phone: z
    .string()
    .regex(
      /^(\+31|0)[1-9]\d{8,9}$/,
      'Voer een geldig Nederlands telefoonnummer in'
    ),
  service: z.string().min(1, 'Selecteer een dienst'),
  description: z.string().max(500, 'Maximaal 500 tekens').optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'U moet akkoord gaan met het privacybeleid',
  }),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const services = {
  residential: {
    title: 'Woningrenovatie',
    items: [
      'Keukenrenovatie',
      'Badkamerrenovatie',
      'Interieur Herontwerp',
      'Vloerinstallatie',
      'Wand- & Plafondwerk',
    ],
  },
  commercial: {
    title: 'Commerciële Projecten',
    items: [
      'Kantoorinrichting',
      'Winkelruimte Ontwerp',
      'Commerciële Vloeren',
      'Wandafscheidingen',
      'Maatwerk Kasten',
    ],
  },
  structural: {
    title: 'Constructiewerk',
    items: [
      'Funderingsherstel',
      'Dragende Muur Werkzaamheden',
      'Dakreparatie & Installatie',
      'Gevelrenovatie',
    ],
  },
} as const

export const allServices = [
  ...services.residential.items,
  ...services.commercial.items,
  ...services.structural.items,
]
