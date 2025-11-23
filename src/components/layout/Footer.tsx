import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Artist Name. All rights reserved.</p>

          <div className="flex gap-6">
            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors duration-200"
            >
              Instagram
            </a>
            <a
              href="mailto:your@email.com"
              className="hover:text-black transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link href="/work" className="hover:text-black transition-colors duration-200">
              Work
            </Link>
            <Link href="/about" className="hover:text-black transition-colors duration-200">
              About
            </Link>
            <Link href="/exhibitions" className="hover:text-black transition-colors duration-200">
              Exhibitions
            </Link>
            <Link href="/cv" className="hover:text-black transition-colors duration-200">
              CV
            </Link>
            <Link href="/contact" className="hover:text-black transition-colors duration-200">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
