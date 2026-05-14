'use client'

import { Project } from '@/lib/projects-data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  onClick: (project: Project) => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card 
      className="group cursor-pointer overflow-hidden rounded-2xl border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      onClick={() => onClick(project)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-navy/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Floating Arrow Icon */}
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>
      
      <CardContent className="p-6">
        <Badge variant="secondary" className="mb-3 bg-lime/10 text-lime-dark hover:bg-lime/20 border-0">
          {project.service}
        </Badge>
        <h3 className="text-xl font-bold text-navy group-hover:text-lime-dark transition-colors">
          {project.title}
        </h3>
        {project.location && (
          <p className="mt-2 text-sm text-gray flex items-center gap-1">
            <span className="inline-block h-1 w-1 rounded-full bg-lime" />
            {project.location}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
