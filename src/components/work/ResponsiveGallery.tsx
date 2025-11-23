'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Artwork } from '@/types';

const HorizontalGallery = dynamic(() => import('./HorizontalGallery'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black" />
    </div>
  ),
});

const VerticalGallery = dynamic(() => import('./VerticalGallery'), {
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black" />
    </div>
  ),
});

interface ResponsiveGalleryProps {
  artworks: Artwork[];
}

export default function ResponsiveGallery({ artworks }: ResponsiveGalleryProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black" />
      </div>
    );
  }

  return isMobile ? (
    <VerticalGallery artworks={artworks} />
  ) : (
    <HorizontalGallery artworks={artworks} />
  );
}
