import Image from 'next/image';
import { Artwork } from '@/types';

interface ArtworkCardProps {
  artwork: Artwork;
  priority?: boolean;
}

export default function ArtworkCard({ artwork, priority = false }: ArtworkCardProps) {
  return (
    <article className="group">
      <div className="aspect-square relative overflow-hidden bg-gray-100 mb-4">
        <Image
          src={artwork.images.thumbnail || artwork.images.full}
          alt={artwork.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <h3 className="text-lg font-light">{artwork.title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        {artwork.year} | {artwork.medium}
      </p>
      <p className="text-sm text-gray-500">{artwork.dimensions}</p>
    </article>
  );
}
