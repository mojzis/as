import type { Metadata } from 'next';
import { series } from '@/data/artworks';
import SeriesGrid from '@/components/work/SeriesGrid';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Portfolio of glass artworks including blown glass vessels, kiln-formed sculptures, and installations.',
};

export default function WorkPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-light mb-6">Portfolio</h1>
      <p className="text-gray-600 mb-12 max-w-2xl">
        Explore collections of work spanning blown glass, kiln-formed sculptures,
        and large-scale installations. Each series represents a distinct
        exploration of form, light, and material.
      </p>

      <SeriesGrid series={series} />
    </div>
  );
}
