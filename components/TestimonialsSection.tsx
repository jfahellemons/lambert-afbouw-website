'use client'

import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Maria de Vries',
    role: 'Huiseigenaar, Amsterdam',
    content:
      'Lambert Afbouw heeft onze complete keuken gerenoveerd. Vanaf het eerste contact tot de oplevering was alles perfect geregeld. De kwaliteit van het werk is uitmuntend en het team was zeer professioneel.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Peter Jansen',
    role: 'Bedrijfseigenaar, Utrecht',
    content:
      'Voor onze kantoorverbouwing kozen we Lambert Afbouw en we hebben daar geen seconde spijt van gehad. Ze werkten binnen budget, op tijd en met oog voor detail. Zeer aan te bevelen!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Sandra Bakker',
    role: 'Huiseigenaar, Rotterdam',
    content:
      'Onze badkamer ziet er fantastisch uit! Het team dacht mee met onze wensen en kwam met creatieve oplossingen. De communicatie was top en ze ruimden netjes alles op na afloop.',
    rating: 5,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-lime text-lime' : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-navy lg:text-4xl">
            Wat Onze Klanten <span className="text-lime-dark">Zeggen</span>
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Met meer dan 15 jaar ervaring hebben wij honderden tevreden klanten 
            geholpen met hun renovatie- en afbouwprojecten.
          </p>
          
          {/* Werkspot Rating Badge */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-secondary px-5 py-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-lime text-lime" />
              ))}
            </div>
            <span className="font-semibold text-navy">4.9/5</span>
            <span className="text-muted-foreground">op Werkspot</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="relative flex flex-col rounded-2xl bg-secondary p-6 lg:p-8"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-lime">
                <Quote className="h-4 w-4 text-navy" />
              </div>

              {/* Content */}
              <div className="mb-6 mt-4 flex-1">
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-semibold text-navy">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
                <StarRating rating={testimonial.rating} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
