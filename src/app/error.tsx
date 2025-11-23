'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-light mb-4">Error</h1>
        <h2 className="text-xl text-gray-600 mb-4">Something went wrong</h2>
        <p className="text-gray-500 mb-8">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={reset}
          className="border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
