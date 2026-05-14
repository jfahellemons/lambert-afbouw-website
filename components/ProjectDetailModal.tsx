'use client'

import { Project } from '@/lib/projects-data'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Phone, MapPin, Calendar, ArrowRight } from 'lucide-react'

interface ProjectDetailModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
  onContactClick: (service: string) => void
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  onContactClick,
}: ProjectDetailModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-0 p-0 sm:max-w-2xl [&>button]:text-white [&>button]:bg-navy/50 [&>button]:backdrop-blur-sm [&>button]:hover:bg-navy/70">
        {/* Project Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <Badge className="mb-3 bg-lime text-navy hover:bg-lime border-0">
              {project.service}
            </Badge>
            <DialogTitle className="text-2xl font-bold text-white sm:text-3xl">
              {project.title}
            </DialogTitle>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {project.location && (
              <div className="flex items-center gap-2 text-sm text-gray-dark">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-light">
                  <MapPin className="h-4 w-4 text-lime-dark" />
                </div>
                <div>
                  <p className="text-xs text-gray font-medium uppercase tracking-wider">Locatie</p>
                  <p className="font-semibold">{project.location}</p>
                </div>
              </div>
            )}
            {project.duration && (
              <div className="flex items-center gap-2 text-sm text-gray-dark">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-light">
                  <Calendar className="h-4 w-4 text-lime-dark" />
                </div>
                <div>
                  <p className="text-xs text-gray font-medium uppercase tracking-wider">Duur</p>
                  <p className="font-semibold">{project.duration}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-navy">Over dit project</h4>
            <DialogDescription className="text-base leading-relaxed text-gray-dark">
              {project.description}
            </DialogDescription>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              onClick={() => {
                onClose()
                onContactClick(project.service)
              }}
              className="flex-1 bg-lime h-12 text-navy font-bold hover:bg-lime-dark shadow-lg shadow-lime/20"
            >
              Vraag offerte aan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="h-12 border-gray-200 text-navy font-semibold hover:bg-gray-light"
            >
              Sluiten
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
