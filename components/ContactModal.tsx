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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-navy">
            Vraag een Gratis Offerte Aan
          </DialogTitle>
          <DialogDescription>
            Vul het formulier in en wij nemen binnen 24 uur contact met u op.
          </DialogDescription>
        </DialogHeader>

        {submitStatus === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime/20">
              <CheckCircle className="h-8 w-8 text-lime-dark" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy">
                Bedankt voor uw aanvraag!
              </h3>
              <p className="mt-1 text-muted-foreground">
                Wij nemen zo snel mogelijk contact met u op.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Naam <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Uw volledige naam"
                {...register('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                E-mailadres <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="uw@email.nl"
                {...register('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                Telefoonnummer <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="06 12345678"
                {...register('phone')}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Service */}
            <div className="space-y-2">
              <Label htmlFor="service">
                Dienst <span className="text-destructive">*</span>
              </Label>
              <Select
                value={watch('service')}
                onValueChange={(value) => setValue('service', value)}
              >
                <SelectTrigger
                  id="service"
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? 'service-error' : undefined}
                >
                  <SelectValue placeholder="Selecteer een dienst" />
                </SelectTrigger>
                <SelectContent>
                  {allServices.map((service) => (
                    <SelectItem key={service} value={service}>
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
              <Label htmlFor="description">Omschrijving (optioneel)</Label>
              <Textarea
                id="description"
                placeholder="Vertel ons meer over uw project..."
                rows={4}
                {...register('description')}
                aria-describedby={
                  errors.description ? 'description-error' : undefined
                }
              />
              {errors.description && (
                <p id="description-error" className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Consent */}
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={watch('consent')}
                  onCheckedChange={(checked) =>
                    setValue('consent', checked === true)
                  }
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                />
                <Label
                  htmlFor="consent"
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  Ik ga akkoord met het privacybeleid en geef toestemming voor 
                  het verwerken van mijn gegevens.{' '}
                  <span className="text-destructive">*</span>
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
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0" />
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
              className="w-full bg-lime text-navy hover:bg-lime-dark"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verzenden...
                </>
              ) : (
                'Offerte Aanvragen'
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
