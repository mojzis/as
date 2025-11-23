import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Artist Name, a contemporary glass artist specializing in blown glass and kiln-formed sculpture.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="relative aspect-square bg-gray-100">
            <Image
              src="/images/about/artist-photo.jpg"
              alt="Artist Name in studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-light mb-6">About</h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              Artist Name is a contemporary glass artist based in [City, State].
              Working primarily in blown glass and kiln-formed techniques, their
              work explores the interplay of light, form, and materiality.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With a background in [relevant experience], Artist Name brings a
              unique perspective to the ancient art of glassmaking, creating
              pieces that bridge traditional craft and contemporary art.
            </p>
          </div>
        </div>

        {/* Artist Statement */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6">Artist Statement</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              My work explores the delicate balance between control and spontaneity
              inherent in working with glass. Each piece begins as a conversation
              between material and intention, where the molten glass responds to
              breath, gravity, and heat in ways that can never be fully predicted.
            </p>
            <p>
              I am drawn to glass for its ability to capture and transform light,
              creating objects that seem to glow from within. Through both
              traditional glassblowing and kiln-forming techniques, I create
              vessels and sculptures that invite contemplation and reward close
              looking.
            </p>
            <p>
              Recent work has focused on [specific themes or techniques], exploring
              how form can evoke memory, emotion, and a sense of presence. I am
              interested in creating objects that feel simultaneously ancient and
              contemporary, familiar yet strange.
            </p>
          </div>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6">Education</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">BFA, Glass</p>
              <p className="text-gray-600">University Name, 2024</p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6">Process</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              My studio practice encompasses both hot and cold glass techniques.
              In the hot shop, I work with traditional glassblowing methods,
              gathering, shaping, and blowing molten glass gathered from a furnace
              at over 2000&deg;F.
            </p>
            <p>
              For kiln-formed work, I employ casting, fusing, and slumping
              techniques, carefully controlling temperature cycles over days or
              weeks to achieve specific optical and textural effects.
            </p>
            <p>
              Each piece undergoes careful annealing to relieve internal stresses,
              followed by cold-working processes including grinding, polishing, and
              sandblasting to achieve the final surface quality.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center py-12 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Interested in commissions or collaborations?
          </p>
          <a
            href="/contact"
            className="inline-block border border-black px-8 py-3 text-sm tracking-wide hover:bg-black hover:text-white transition-colors duration-300"
          >
            Get in Touch
          </a>
        </section>
      </div>
    </div>
  );
}
