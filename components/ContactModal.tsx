'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import {
  contactFormSchema,
  type ContactFormData,
  allServices,
} from '@/lib/validations'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  preselectedService?: string
}

export function ContactModal({
  isOpen,
  onClose,
  preselectedService = '',
}: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: preselectedService,
      description: '',
      consent: false,
    },
  })

  // Update service when preselectedService changes
  if (preselectedService && watch('service') !== preselectedService) {
    setValue('service', preselectedService)
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        setTimeout(() => {
          onClose()
          setSubmitStatus('idle')
        }, 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
      setSubmitStatus('idle')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-0 p-0 sm:max-w-lg">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden bg-navy px-6 pb-6 pt-8">
          {/* Decorative elements */}
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-lime/10" />
          <div className="absolute -left-4 bottom-0 h-24 w-24 rounded-full bg-lime/5" />
          
          <DialogHeader className="relative">
            <DialogTitle className="text-2xl font-bold text-white">
              Vraag een Gratis Offerte Aan
            </DialogTitle>
            <DialogDescription className="mt-2 text-white/70">
              Vul het formulier in en wij nemen binnen 24 uur contact met u op.
            </DialogDescription>
          </DialogHeader>
          
          {/* Accent bar */}
          <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-lime via-lime-dark to-lime" />
        </div>

        <div className="px-6 pb-6 pt-6">
          {submitStatus === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-lime/20 to-lime/5 ring-4 ring-lime/20">
                <CheckCircle className="h-10 w-10 text-lime-dark" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">
                  Bedankt voor uw aanvraag!
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Wij nemen zo snel mogelijk contact met u op.
                </p>
              </div>
            </div>
          ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-navy">
                Naam <span className="text-lime-dark">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Uw volledige naam"
                {...register('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="border-gray-200 transition-all duration-200 focus:border-lime focus:ring-lime/20"
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-navy">
                E-mailadres <span className="text-lime-dark">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="uw@email.nl"
                {...register('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="border-gray-200 transition-all duration-200 focus:border-lime focus:ring-lime/20"
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-navy">
                Telefoonnummer <span className="text-lime-dark">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="06 12345678"
                {...register('phone')}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className="border-gray-200 transition-all duration-200 focus:border-lime focus:ring-lime/20"
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Service */}
            <div className="space-y-2">
              <Label htmlFor="service" className="text-sm font-medium text-navy">
                Dienst <span className="text-lime-dark">*</span>
              </Label>
              <Select
                value={watch('service')}
                onValueChange={(value) => setValue('service', value)}
              >
                <SelectTrigger
                  id="service"
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? 'service-error' : undefined}
                  className="border-gray-200 transition-all duration-200 focus:border-lime focus:ring-lime/20"
                >
                  <SelectValue placeholder="Selecteer een dienst" />
                </SelectTrigger>
                <SelectContent>
                  {allServices.map((service) => (
                    <SelectItem key={service} value={service} className="cursor-pointer hover:bg-lime/10 focus:bg-lime/10">
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service && (
                <p id="service-error" className="text-sm text-destructive">
                  {errors.service.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-navy">
                Omschrijving <span className="text-muted-foreground font-normal">(optioneel)</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Vertel ons meer over uw project..."
                rows={4}
                {...register('description')}
                aria-describedby={
                  errors.description ? 'description-error' : undefined
                }
                className="border-gray-200 transition-all duration-200 focus:border-lime focus:ring-lime/20 resize-none"
              />
              {errors.description && (
                <p id="description-error" className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Consent */}
            <div className="space-y-2 rounded-xl bg-gray-light p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={watch('consent')}
                  onCheckedChange={(checked) =>
                    setValue('consent', checked === true)
                  }
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                  className="mt-0.5 border-gray-300 data-[state=checked]:border-lime data-[state=checked]:bg-lime data-[state=checked]:text-navy"
                />
                <Label
                  htmlFor="consent"
                  className="text-sm leading-relaxed text-muted-foreground cursor-pointer"
                >
                  Ik ga akkoord met het privacybeleid en geef toestemming voor 
                  het verwerken van mijn gegevens.{' '}
                  <span className="text-lime-dark">*</span>
                </Label>
              </div>
              {errors.consent && (
                <p id="consent-error" className="text-sm text-destructive">
                  {errors.consent.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="flex items-center gap-3 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>
                  Er is iets misgegaan. Probeer het opnieuw of neem telefonisch 
                  contact met ons op.
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-lime to-lime-dark text-navy font-semibold text-base shadow-lg shadow-lime/25 transition-all duration-300 hover:shadow-xl hover:shadow-lime/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verzenden...
                </>
              ) : (
                'Offerte Aanvragen'
              )}
            </Button>
          </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
