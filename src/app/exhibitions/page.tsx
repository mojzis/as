import type { Metadata } from 'next';
import { exhibitions, upcomingExhibitions } from '@/data/exhibitions';

export const metadata: Metadata = {
  title: 'Exhibitions',
  description: 'View past and upcoming exhibitions featuring glass artwork by Artist Name.',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

function formatDateRange(start: string, end?: string): string {
  if (end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth()) {
      return formatDate(start);
    }

    return `${formatDate(start)} - ${formatDate(end)}`;
  }
  return formatDate(start);
}

export default function ExhibitionsPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light mb-12">Exhibitions</h1>

        {/* Upcoming Exhibitions */}
        {upcomingExhibitions.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-light mb-8 pb-4 border-b border-gray-200">
              Upcoming
            </h2>
            <div className="space-y-8">
              {upcomingExhibitions.map((exhibition) => (
                <article key={exhibition.id} className="border-l-2 border-black pl-6">
                  <p className="text-sm text-gray-500 mb-1">
                    {formatDateRange(exhibition.startDate, exhibition.endDate)}
                  </p>
                  <h3 className="text-xl font-light mb-1">{exhibition.title}</h3>
                  <p className="text-gray-700">{exhibition.venue}</p>
                  <p className="text-gray-500">{exhibition.location}</p>
                  {exhibition.description && (
                    <p className="text-gray-600 mt-2">{exhibition.description}</p>
                  )}
                  <span className="inline-block mt-2 text-xs uppercase tracking-wider bg-gray-100 px-2 py-1">
                    {exhibition.type}
                  </span>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Past Exhibitions */}
        <section>
          <h2 className="text-2xl font-light mb-8 pb-4 border-b border-gray-200">
            Past Exhibitions
          </h2>
          <div className="space-y-8">
            {exhibitions.map((exhibition) => (
              <article key={exhibition.id} className="border-l-2 border-gray-300 pl-6">
                <p className="text-sm text-gray-500 mb-1">
                  {formatDateRange(exhibition.startDate, exhibition.endDate)}
                </p>
                <h3 className="text-xl font-light mb-1">{exhibition.title}</h3>
                <p className="text-gray-700">{exhibition.venue}</p>
                <p className="text-gray-500">{exhibition.location}</p>
                {exhibition.description && (
                  <p className="text-gray-600 mt-2">{exhibition.description}</p>
                )}
                <span className="inline-block mt-2 text-xs uppercase tracking-wider bg-gray-100 px-2 py-1">
                  {exhibition.type}
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
