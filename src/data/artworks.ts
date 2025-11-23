import { Series } from '@/types';

export const series: Series[] = [
  {
    slug: 'blown-glass',
    title: 'Blown Glass',
    description: 'Vessels and sculptures created through traditional glassblowing techniques, exploring form, color, and light.',
    coverImage: '/images/work/blown-glass/vessel-001.jpg',
    artworks: [
      {
        id: 'bg-001',
        title: 'Cobalt Vessel I',
        year: 2024,
        medium: 'Blown glass',
        dimensions: '12" H × 8" W × 8" D',
        series: 'blown-glass',
        images: {
          full: '/images/work/blown-glass/vessel-001.jpg',
          thumbnail: '/images/work/blown-glass/vessel-001-thumb.jpg',
          mobile: '/images/work/blown-glass/vessel-001-mobile.jpg',
        },
        alt: 'Blown glass vessel with cobalt blue gradient',
        description: 'Hand-blown vessel featuring gradient from clear to cobalt blue.',
      },
      {
        id: 'bg-002',
        title: 'Amber Flow',
        year: 2024,
        medium: 'Blown glass',
        dimensions: '14" H × 6" W × 6" D',
        series: 'blown-glass',
        images: {
          full: '/images/work/blown-glass/vessel-002.jpg',
          thumbnail: '/images/work/blown-glass/vessel-002-thumb.jpg',
          mobile: '/images/work/blown-glass/vessel-002-mobile.jpg',
        },
        alt: 'Elongated amber blown glass vessel',
        description: 'Elongated form with warm amber tones and organic curves.',
      },
      {
        id: 'bg-003',
        title: 'Morning Mist',
        year: 2023,
        medium: 'Blown glass',
        dimensions: '10" H × 10" W × 10" D',
        series: 'blown-glass',
        images: {
          full: '/images/work/blown-glass/vessel-003.jpg',
          thumbnail: '/images/work/blown-glass/vessel-003-thumb.jpg',
          mobile: '/images/work/blown-glass/vessel-003-mobile.jpg',
        },
        alt: 'Frosted white blown glass sphere',
        description: 'Spherical form with soft frosted surface.',
      },
    ],
  },
  {
    slug: 'kiln-formed',
    title: 'Kiln-Formed',
    description: 'Cast and fused glass sculptures exploring texture, depth, and translucency through kiln processes.',
    coverImage: '/images/work/kiln-formed/cast-001.jpg',
    artworks: [
      {
        id: 'kf-001',
        title: 'Strata I',
        year: 2024,
        medium: 'Cast glass',
        dimensions: '8" H × 12" W × 4" D',
        series: 'kiln-formed',
        images: {
          full: '/images/work/kiln-formed/cast-001.jpg',
          thumbnail: '/images/work/kiln-formed/cast-001-thumb.jpg',
          mobile: '/images/work/kiln-formed/cast-001-mobile.jpg',
        },
        alt: 'Layered cast glass sculpture with geological patterns',
        description: 'Exploring geological forms through layered casting techniques.',
      },
      {
        id: 'kf-002',
        title: 'Tidal Memory',
        year: 2023,
        medium: 'Fused glass, steel base',
        dimensions: '6" H × 18" W × 6" D',
        series: 'kiln-formed',
        images: {
          full: '/images/work/kiln-formed/cast-002.jpg',
          thumbnail: '/images/work/kiln-formed/cast-002-thumb.jpg',
          mobile: '/images/work/kiln-formed/cast-002-mobile.jpg',
        },
        alt: 'Wave-like fused glass sculpture on steel base',
        description: 'Capturing the rhythm of ocean waves in fused glass.',
      },
    ],
  },
  {
    slug: 'installations',
    title: 'Installations',
    description: 'Large-scale glass installations for architectural and gallery spaces.',
    coverImage: '/images/work/installations/install-001.jpg',
    artworks: [
      {
        id: 'in-001',
        title: 'Suspended Light',
        year: 2024,
        medium: 'Blown glass, steel cable',
        dimensions: '8\' H × 6\' W × 6\' D',
        series: 'installations',
        images: {
          full: '/images/work/installations/install-001.jpg',
          thumbnail: '/images/work/installations/install-001-thumb.jpg',
          mobile: '/images/work/installations/install-001-mobile.jpg',
        },
        alt: 'Suspended glass installation with multiple blown glass elements',
        description: 'Site-specific installation exploring light and space.',
        exhibitions: ['BFA Thesis Exhibition 2024'],
      },
    ],
  },
];

export function getSeriesBySlug(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}

export function getAllArtworks(): Series['artworks'] {
  return series.flatMap((s) => s.artworks);
}
