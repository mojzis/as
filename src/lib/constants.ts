export const SITE_CONFIG = {
  name: 'Artist Name',
  title: 'Artist Name | Glass Artist',
  description:
    'Contemporary glass artist specializing in blown glass and kiln-formed sculpture.',
  url: 'https://artistname.com',
  email: 'your@email.com',
  instagram: 'https://instagram.com/yourhandle',
  instagramHandle: '@yourhandle',
  location: 'City, State',
} as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

export const ANIMATION = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },
  ease: {
    default: 'power2.out',
    smooth: 'power3.inOut',
    bounce: 'back.out(1.7)',
  },
} as const;
