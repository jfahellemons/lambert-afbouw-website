'use client'

export function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
      
      {/* Animated blob 1 - Top right, lime */}
      <div 
        className="absolute -right-1/4 -top-1/4 h-[60vh] w-[60vh] animate-blob rounded-full bg-lime/20 mix-blend-screen blur-3xl"
        style={{ animationDelay: '0s' }}
      />
      
      {/* Animated blob 2 - Bottom left, lime darker */}
      <div 
        className="absolute -bottom-1/4 -left-1/4 h-[50vh] w-[50vh] animate-blob rounded-full bg-lime-dark/15 mix-blend-screen blur-3xl"
        style={{ animationDelay: '-5s' }}
      />
      
      {/* Animated blob 3 - Center, subtle white */}
      <div 
        className="absolute left-1/3 top-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 animate-blob rounded-full bg-white/5 mix-blend-screen blur-3xl"
        style={{ animationDelay: '-2.5s' }}
      />
      
      {/* Animated blob 4 - Top left, lime accent */}
      <div 
        className="absolute -left-1/6 top-1/4 h-[35vh] w-[35vh] animate-blob-reverse rounded-full bg-lime/10 mix-blend-screen blur-3xl"
        style={{ animationDelay: '-3.5s' }}
      />
      
      {/* Animated blob 5 - Bottom right, larger lime */}
      <div 
        className="absolute -bottom-1/6 right-1/4 h-[45vh] w-[45vh] animate-blob-reverse rounded-full bg-lime/15 mix-blend-screen blur-3xl"
        style={{ animationDelay: '-1.5s' }}
      />
      
      {/* Subtle noise overlay for texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <svg className="h-full w-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
    </div>
  )
}
