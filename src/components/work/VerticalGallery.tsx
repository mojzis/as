'use client';

import Image from 'next/image';
import { Artwork } from '@/types';

interface VerticalGalleryProps {
  artworks: Artwork[];
}

export default function VerticalGallery({ artworks }: VerticalGalleryProps) {
  if (artworks.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">No artworks available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {artworks.map((artwork) => (
        <article key={artwork.id} className="space-y-4">
          <div className="relative aspect-[4/3] w-full bg-gray-50">
            <Image
              src={artwork.images.mobile || artwork.images.full}
              alt={artwork.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-light">{artwork.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {artwork.year} | {artwork.medium}
            </p>
            <p className="text-sm text-gray-600">{artwork.dimensions}</p>
            {artwork.description && (
              <p className="text-sm text-gray-700 mt-3 max-w-md mx-auto">
                {artwork.description}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
