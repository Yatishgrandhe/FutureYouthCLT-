'use client'

import { useState } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import { Image as ImageIcon, X } from 'lucide-react'
import Image from 'next/image'

// Placeholder images - replace these with actual images later
const galleryImages = [
  {
    id: 1,
    src: 'https://via.placeholder.com/800x600/4A7C59/FFFFFF?text=Event+1',
    alt: 'Event 1',
    title: 'Community Event',
    description: 'Our first community gathering',
  },
  {
    id: 2,
    src: 'https://via.placeholder.com/800x600/6B8E23/FFFFFF?text=Event+2',
    alt: 'Event 2',
    title: 'Leadership Workshop',
    description: 'Developing leadership skills',
  },
  {
    id: 3,
    src: 'https://via.placeholder.com/800x600/8FBC8F/000000?text=Event+3',
    alt: 'Event 3',
    title: 'Networking Session',
    description: 'Connecting with peers',
  },
  {
    id: 4,
    src: 'https://via.placeholder.com/800x600/4A7C59/FFFFFF?text=Event+4',
    alt: 'Event 4',
    title: 'Community Service',
    description: 'Giving back to the community',
  },
  {
    id: 5,
    src: 'https://via.placeholder.com/800x600/6B8E23/FFFFFF?text=Event+5',
    alt: 'Event 5',
    title: 'Team Building',
    description: 'Building stronger connections',
  },
  {
    id: 6,
    src: 'https://via.placeholder.com/800x600/8FBC8F/000000?text=Event+6',
    alt: 'Event 6',
    title: 'Youth Summit',
    description: 'Empowering the next generation',
  },
  {
    id: 7,
    src: 'https://via.placeholder.com/800x600/4A7C59/FFFFFF?text=Event+7',
    alt: 'Event 7',
    title: 'Workshop Series',
    description: 'Learning and growing together',
  },
  {
    id: 8,
    src: 'https://via.placeholder.com/800x600/6B8E23/FFFFFF?text=Event+8',
    alt: 'Event 8',
    title: 'Community Outreach',
    description: 'Making a positive impact',
  },
  {
    id: 9,
    src: 'https://via.placeholder.com/800x600/8FBC8F/000000?text=Event+9',
    alt: 'Event 9',
    title: 'Annual Gathering',
    description: 'Celebrating our achievements',
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-display text-primary-green-light mb-4">
              Gallery
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our events, activities, and memorable moments
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg border border-primary-green-medium/20 
                         bg-gradient-to-br from-primary-green-dark/10 to-primary-green-medium/10
                         hover:border-primary-green-medium/50 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full 
                                group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold mb-1">{image.title}</h3>
                    <p className="text-gray-300 text-sm">{image.description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-primary-green-medium/90 p-2 rounded-full">
                    <ImageIcon className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full max-h-[90vh]">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary-green-light 
                         transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative aspect-video rounded-lg overflow-hidden border border-primary-green-medium/30">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-display text-primary-green-light mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-300">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

