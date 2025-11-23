import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-light mb-4">404</h1>
        <h2 className="text-2xl text-gray-600 mb-4">Page not found</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
