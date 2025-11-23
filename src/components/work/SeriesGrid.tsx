import Link from 'next/link';
import Image from 'next/image';
import { Series } from '@/types';

interface SeriesGridProps {
  series: Series[];
}

export default function SeriesGrid({ series }: SeriesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {series.map((s) => (
        <Link
          key={s.slug}
          href={`/work/${s.slug}`}
          className="group block"
        >
          <div className="aspect-[4/3] relative overflow-hidden mb-4 bg-gray-100">
            {s.artworks[0] && (
              <Image
                src={s.artworks[0].images.thumbnail || s.artworks[0].images.full}
                alt={s.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          <h2 className="text-2xl font-light mb-2">{s.title}</h2>
          <p className="text-gray-600">{s.description}</p>
          <p className="text-sm text-gray-400 mt-2">
            {s.artworks.length} {s.artworks.length === 1 ? 'work' : 'works'}
          </p>
        </Link>
      ))}
    </div>
  );
}
