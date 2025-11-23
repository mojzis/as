import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { series as allSeries, getSeriesBySlug } from '@/data/artworks';
import ResponsiveGallery from '@/components/work/ResponsiveGallery';

interface SeriesPageProps {
  params: Promise<{ series: string }>;
}

export async function generateStaticParams() {
  return allSeries.map((s) => ({
    series: s.slug,
  }));
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
  const { series: seriesSlug } = await params;
  const series = getSeriesBySlug(seriesSlug);

  if (!series) {
    return {
      title: 'Series Not Found',
    };
  }

  return {
    title: series.title,
    description: series.description,
    openGraph: {
      title: `${series.title} | Artist Name`,
      description: series.description,
      images: series.artworks[0]
        ? [{ url: series.artworks[0].images.full }]
        : [],
    },
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series: seriesSlug } = await params;
  const series = getSeriesBySlug(seriesSlug);

  if (!series) {
    notFound();
  }

  return (
    <div>
      {/* Series Header */}
      <div className="container mx-auto px-6 py-12">
        <nav className="mb-8 text-sm">
          <Link href="/work" className="text-gray-500 hover:text-black transition-colors">
            Work
          </Link>
          <span className="mx-2 text-gray-300">/</span>
          <span>{series.title}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-light mb-4">{series.title}</h1>
        <p className="text-gray-600 max-w-2xl">{series.description}</p>
      </div>

      {/* Gallery */}
      <ResponsiveGallery artworks={series.artworks} />

      {/* Other Series Navigation */}
      <div className="container mx-auto px-6 py-20 border-t border-gray-200">
        <h2 className="text-2xl font-light mb-8">Other Series</h2>
        <div className="flex flex-wrap gap-4">
          {allSeries
            .filter((s) => s.slug !== seriesSlug)
            .map((s) => (
              <Link
                key={s.slug}
                href={`/work/${s.slug}`}
                className="px-6 py-3 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors duration-300"
              >
                {s.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
