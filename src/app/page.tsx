import Link from 'next/link';
import Image from 'next/image';
import { series } from '@/data/artworks';

export default function Home() {
  // Get featured artworks (first artwork from each series)
  const featuredArtworks = series.map((s) => s.artworks[0]).filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-32 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-tight">
          Artist Name
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto font-light">
          Contemporary glass artist specializing in blown glass and kiln-formed
          sculpture
        </p>
        <Link
          href="/work"
          className="inline-block border border-black px-8 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition-colors duration-300"
        >
          View Work
        </Link>
      </section>

      {/* Featured Work Preview */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-light mb-12 text-center">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArtworks.slice(0, 3).map((artwork, index) => (
            <Link
              key={artwork.id}
              href={`/work/${artwork.series}`}
              className="group block"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={artwork.images.full}
                  alt={artwork.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index < 2}
                />
              </div>
              <h3 className="text-lg font-light">{artwork.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {artwork.year} | {artwork.medium}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/work"
            className="text-sm text-gray-600 hover:text-black transition-colors duration-200 underline underline-offset-4"
          >
            View all work
          </Link>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed mb-8">
            &ldquo;My work explores the delicate balance between control and
            spontaneity inherent in glass. Through both traditional glassblowing
            and kiln-forming techniques, I create vessels and sculptures that
            capture light and invite contemplation.&rdquo;
          </p>
          <Link
            href="/about"
            className="text-sm text-gray-600 hover:text-black transition-colors duration-200 underline underline-offset-4"
          >
            Learn more about the artist
          </Link>
        </div>
      </section>

      {/* Series Overview */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-light mb-12 text-center">Series</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {series.map((s) => (
            <Link key={s.slug} href={`/work/${s.slug}`} className="group block">
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 mb-4">
                {s.artworks[0] && (
                  <Image
                    src={s.artworks[0].images.full}
                    alt={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-light">{s.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
