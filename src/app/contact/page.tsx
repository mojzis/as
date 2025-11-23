import type { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Artist Name for commissions, collaborations, or inquiries.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light mb-8">Get in Touch</h1>

        <div className="mb-12 space-y-4 text-gray-700">
          <p>
            Available for commissions, collaborations, and exhibitions. I welcome
            inquiries from galleries, collectors, and fellow artists.
          </p>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:your@email.com"
                className="underline hover:text-black transition-colors"
              >
                your@email.com
              </a>
            </p>
            <p>
              <strong>Instagram:</strong>{' '}
              <a
                href="https://instagram.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-black transition-colors"
              >
                @yourhandle
              </a>
            </p>
            <p>
              <strong>Studio Location:</strong> City, State
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-light mb-6">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
