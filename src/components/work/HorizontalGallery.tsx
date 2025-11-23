'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Artwork } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalGalleryProps {
  artworks: Artwork[];
  onArtworkChange?: (index: number) => void;
}

export default function HorizontalGallery({
  artworks,
  onArtworkChange,
}: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const gallery = galleryRef.current;

    if (!container || !gallery || artworks.length === 0) return;

    // Calculate dimensions
    const galleryWidth = gallery.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = galleryWidth - viewportWidth;

    if (scrollDistance <= 0) return;

    // Create horizontal scroll animation
    const tween = gsap.to(gallery, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const prog = self.progress;
          setProgress(prog);

          // Determine current artwork
          const artworkWidth = viewportWidth * 0.7;
          const newIndex = Math.floor((prog * scrollDistance) / artworkWidth);
          const clampedIndex = Math.min(
            Math.max(newIndex, 0),
            artworks.length - 1
          );

          if (clampedIndex !== currentIndex) {
            setCurrentIndex(clampedIndex);
            onArtworkChange?.(clampedIndex);
          }
        },
      },
    });

    // Keyboard navigation
    const handleKeyboard = (e: KeyboardEvent) => {
      const viewportWidth = window.innerWidth;
      const artworkWidth = viewportWidth * 0.7;

      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        const targetScroll =
          window.scrollY - artworkWidth;
        window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
      } else if (e.key === 'ArrowRight' && currentIndex < artworks.length - 1) {
        const targetScroll = window.scrollY + artworkWidth;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyboard);

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [artworks, currentIndex, onArtworkChange]);

  if (artworks.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">No artworks available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-200 z-50">
        <div
          className="h-full bg-black transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Artwork counter */}
      <div className="fixed top-24 right-6 text-sm text-gray-600 z-50">
        {currentIndex + 1} / {artworks.length}
      </div>

      {/* Navigation hints */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 text-sm text-gray-400 z-50">
        <span className="hidden md:inline">Use arrow keys or scroll</span>
      </div>

      {/* Gallery container */}
      <div ref={containerRef} className="h-screen overflow-hidden">
        <div
          ref={galleryRef}
          className="flex h-screen items-center gap-8 px-8"
        >
          {artworks.map((artwork, index) => (
            <article
              key={artwork.id}
              className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[60vw] h-[70vh] relative group"
              role="img"
              aria-label={artwork.alt}
            >
              {/* Image Container */}
              <div className="relative w-full h-full bg-gray-50">
                <Image
                  src={artwork.images.full}
                  alt={artwork.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 60vw"
                  priority={index < 2}
                  quality={85}
                />
              </div>

              {/* Metadata */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-light mb-2">{artwork.title}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{artwork.year}</p>
                  <p>{artwork.medium}</p>
                  <p>{artwork.dimensions}</p>
                  {artwork.description && (
                    <p className="mt-3 text-gray-700 max-w-lg">
                      {artwork.description}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
