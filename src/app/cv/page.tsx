import type { Metadata } from 'next';
import Link from 'next/link';
import { getCVByCategory } from '@/data/cv';

export const metadata: Metadata = {
  title: 'CV',
  description: 'Curriculum Vitae for Artist Name - education, exhibitions, awards, and experience.',
};

export default function CVPage() {
  const education = getCVByCategory('education');
  const exhibitions = getCVByCategory('exhibitions');
  const awards = getCVByCategory('awards');
  const experience = getCVByCategory('experience');

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4 md:mb-0">
            Curriculum Vitae
          </h1>
          <a
            href="/files/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download PDF
          </a>
        </div>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-xl font-light mb-6 pb-2 border-b border-gray-200">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((entry, index) => (
              <div key={index} className="flex flex-col md:flex-row md:gap-8">
                <span className="text-gray-500 md:w-24 flex-shrink-0">
                  {entry.year}
                </span>
                <div>
                  <p className="font-medium">{entry.title}</p>
                  {entry.venue && (
                    <p className="text-gray-600">
                      {entry.venue}
                      {entry.location && `, ${entry.location}`}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Exhibitions */}
        <section className="mb-12">
          <h2 className="text-xl font-light mb-6 pb-2 border-b border-gray-200">
            Selected Exhibitions
          </h2>
          <div className="space-y-4">
            {exhibitions.map((entry, index) => (
              <div key={index} className="flex flex-col md:flex-row md:gap-8">
                <span className="text-gray-500 md:w-24 flex-shrink-0">
                  {entry.year}
                </span>
                <div>
                  <p className="font-medium">{entry.title}</p>
                  {entry.venue && (
                    <p className="text-gray-600">
                      {entry.venue}
                      {entry.location && `, ${entry.location}`}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        {awards.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-light mb-6 pb-2 border-b border-gray-200">
              Awards & Honors
            </h2>
            <div className="space-y-4">
              {awards.map((entry, index) => (
                <div key={index} className="flex flex-col md:flex-row md:gap-8">
                  <span className="text-gray-500 md:w-24 flex-shrink-0">
                    {entry.year}
                  </span>
                  <div>
                    <p className="font-medium">{entry.title}</p>
                    {entry.venue && <p className="text-gray-600">{entry.venue}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-light mb-6 pb-2 border-b border-gray-200">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((entry, index) => (
                <div key={index} className="flex flex-col md:flex-row md:gap-8">
                  <span className="text-gray-500 md:w-24 flex-shrink-0">
                    {entry.year}
                  </span>
                  <div>
                    <p className="font-medium">{entry.title}</p>
                    {entry.venue && (
                      <p className="text-gray-600">
                        {entry.venue}
                        {entry.location && `, ${entry.location}`}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section className="pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            For a complete CV or additional information, please{' '}
            <Link
              href="/contact"
              className="underline hover:text-black transition-colors"
            >
              get in touch
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
