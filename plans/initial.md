# Technical Plan: Custom Horizontal Scrolling Glass Artist Portfolio Website

**Project Overview:** Build a minimalist, horizontal-scrolling portfolio website for a glass artist, inspired by Julie Terestman's portfolio design aesthetic.

**Target Audience:** Recent glass art graduate seeking professional opportunities  
**Design Philosophy:** Beautiful > Glossy | Artwork-first | Minimal UI | Gallery-like experience  
**Primary Goals:** Showcase work, accompany CV, attract galleries/collectors/opportunities

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Site Architecture](#site-architecture)
3. [File Structure](#file-structure)
4. [Core Features & Functionality](#core-features--functionality)
5. [Horizontal Scrolling Implementation](#horizontal-scrolling-implementation)
6. [Responsive Design Strategy](#responsive-design-strategy)
7. [Image Management & Optimization](#image-management--optimization)
8. [Performance Optimization](#performance-optimization)
9. [SEO Considerations](#seo-considerations)
10. [Deployment Options](#deployment-options)
11. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)
12. [Code Examples](#code-examples)
13. [Testing Checklist](#testing-checklist)
14. [Maintenance Plan](#maintenance-plan)
15. [Budget & Timeline Estimates](#budget--timeline-estimates)

---

## 1. Technology Stack

### Frontend Framework Options

**Option A: Vanilla HTML/CSS/JavaScript (Recommended for Simplicity)**
- **Pros:** No build process, fast loading, minimal dependencies, easy to maintain
- **Cons:** More manual work for routing, state management
- **Best for:** Simple portfolio with 3-7 pages, static content
- **Libraries needed:** 
  - GSAP (GreenSock) for smooth scrolling animations
  - Vanilla-lazyload for image lazy loading
  - No bundler required

**Option B: React/Next.js (Recommended for Scalability)**
- **Pros:** Component reusability, better state management, SEO with SSG, future scalability
- **Cons:** Build process required, larger initial bundle size, steeper learning curve
- **Best for:** Portfolio that may grow, e-commerce integration planned, blog functionality
- **Libraries needed:**
  - Next.js 14+ (App Router)
  - GSAP or Framer Motion for animations
  - next/image for optimized images
  - React Horizontal Scrolling Menu library (optional)

**Option C: Astro (Emerging Option - Best Performance)**
- **Pros:** Fastest loading, "zero JavaScript by default", excellent SEO, partial hydration
- **Cons:** Newer framework, smaller community, may need React/Vue for interactive components
- **Best for:** Maximum performance, minimal JavaScript needs, content-focused site
- **Libraries needed:**
  - Astro 4+
  - View transitions API (built-in)
  - GSAP for scroll animations
  - React islands for interactive components

### Recommended Stack for This Project

**Primary Choice: Next.js 14 with App Router**

**Rationale:**
- Professional, production-ready framework
- Excellent image optimization (critical for glass photography)
- SEO-friendly with SSG (Static Site Generation)
- Easy to add e-commerce (Stripe/Shopify) later
- Large community and resources
- Vercel hosting makes deployment trivial

**Complete Stack:**
```
Frontend Framework: Next.js 14 (App Router)
Language: TypeScript (optional but recommended)
Styling: Tailwind CSS + Custom CSS
Animations: GSAP (GreenSock Animation Platform)
Image Optimization: next/image + sharp
State Management: React Context API (minimal needs)
Forms: React Hook Form + Nodemailer (contact form)
Hosting: Vercel (recommended) or Netlify
Domain: Namecheap, Google Domains, or similar
Analytics: Vercel Analytics or Google Analytics 4
Version Control: Git + GitHub
```

### Development Tools

```
Code Editor: VS Code
Package Manager: npm or pnpm
Testing: Playwright (E2E), Lighthouse (Performance)
Image Processing: Adobe Lightroom/Photoshop + TinyPNG
Design Tools: Figma (optional - for mockups)
```

---

## 2. Site Architecture

### Page Structure

```
├── Home (/)
│   └── Hero section with featured work or introduction
│
├── Portfolio/Work (/work)
│   ├── Overview (grid or horizontal preview)
│   └── Series Pages (horizontal galleries)
│       ├── /work/blown-glass
│       ├── /work/kiln-formed
│       ├── /work/installations
│       └── /work/[series-slug]
│
├── About (/about)
│   ├── Artist statement
│   ├── Professional bio
│   ├── Education
│   ├── Process/technique
│   └── Photo of artist
│
├── Exhibitions (/exhibitions)
│   ├── Upcoming
│   ├── Past exhibitions
│   └── Exhibition history
│
├── CV/Resume (/cv)
│   ├── Formatted CV
│   └── Downloadable PDF
│
└── Contact (/contact)
    ├── Contact form
    ├── Email/social links
    └── Available for commissions status
```

### Information Architecture

**Primary Navigation:**
- Work (most important - links to portfolio)
- About
- Exhibitions
- CV
- Contact

**Navigation Behavior:**
- Fixed top navigation (fades on scroll, reappears on hover)
- Mobile: Hamburger menu
- Footer: Minimal with copyright, social links

---

## 3. File Structure

### Next.js 14 App Router Structure

```
glass-portfolio/
│
├── public/
│   ├── images/
│   │   ├── work/
│   │   │   ├── blown-glass/
│   │   │   │   ├── piece-001.jpg (original)
│   │   │   │   ├── piece-001-thumb.jpg (thumbnail)
│   │   │   │   └── ...
│   │   │   ├── kiln-formed/
│   │   │   └── installations/
│   │   ├── about/
│   │   │   └── artist-photo.jpg
│   │   └── exhibitions/
│   ├── files/
│   │   └── cv.pdf
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── app/
│   │   ├── layout.tsx (root layout)
│   │   ├── page.tsx (homepage)
│   │   ├── globals.css
│   │   │
│   │   ├── work/
│   │   │   ├── page.tsx (portfolio overview)
│   │   │   ├── [series]/
│   │   │   │   └── page.tsx (dynamic series pages)
│   │   │   └── layout.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── exhibitions/
│   │   │   └── page.tsx
│   │   │
│   │   ├── cv/
│   │   │   └── page.tsx
│   │   │
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   ├── work/
│   │   │   ├── HorizontalGallery.tsx (main component)
│   │   │   ├── ArtworkCard.tsx
│   │   │   ├── SeriesGrid.tsx
│   │   │   └── ImageModal.tsx (lightbox)
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Link.tsx
│   │   │   └── Loader.tsx
│   │   │
│   │   └── forms/
│   │       └── ContactForm.tsx
│   │
│   ├── data/
│   │   ├── artworks.ts (artwork metadata)
│   │   ├── exhibitions.ts
│   │   └── cv.ts
│   │
│   ├── lib/
│   │   ├── gsap.ts (GSAP configuration)
│   │   ├── utils.ts (helper functions)
│   │   └── constants.ts
│   │
│   ├── hooks/
│   │   ├── useHorizontalScroll.ts
│   │   └── useImageLoader.ts
│   │
│   ├── styles/
│   │   ├── horizontal-scroll.css
│   │   └── animations.css
│   │
│   └── types/
│       └── index.ts (TypeScript types)
│
├── .env.local (environment variables)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Core Features & Functionality

### Essential Features (MVP - Week 1-2)

1. **Horizontal scrolling galleries**
   - Smooth, performant scrolling
   - Keyboard navigation (arrow keys)
   - Touch/swipe support for mobile
   - Scroll progress indicator (optional)

2. **Portfolio organization**
   - Multiple series/collections
   - Individual artwork pages with metadata
   - High-resolution image viewing (lightbox)

3. **Responsive design**
   - Desktop: Horizontal scroll
   - Tablet: Hybrid horizontal/vertical
   - Mobile: Vertical scroll (natural behavior)

4. **Basic pages**
   - Homepage with introduction
   - Portfolio/work section
   - About page
   - Contact form
   - CV page with PDF download

5. **Image optimization**
   - Lazy loading
   - Responsive images (multiple sizes)
   - WebP format with JPEG fallback
   - Blur placeholder while loading

### Enhanced Features (Phase 2 - Week 3-4)

6. **Advanced navigation**
   - Fixed header that fades on scroll
   - Breadcrumb navigation
   - Series switcher within galleries

7. **Artwork metadata display**
   - Title, year, medium, dimensions
   - Exhibition history per piece
   - Sold/available status (optional)

8. **Performance optimizations**
   - Image preloading for adjacent works
   - Route prefetching
   - CDN integration

9. **Analytics integration**
   - Page views tracking
   - Gallery engagement metrics
   - Contact form conversions

10. **SEO optimization**
    - Meta tags per page
    - Open Graph images
    - Schema.org structured data
    - XML sitemap

### Future Enhancements (Post-Launch)

11. **E-commerce integration**
    - Stripe checkout
    - Shopping cart
    - Inventory management

12. **Blog/news section**
    - Studio updates
    - Exhibition announcements
    - Process documentation

13. **Video integration**
    - Process videos
    - Time-lapse glassblowing
    - Exhibition walkthroughs

14. **Email newsletter**
    - Mailchimp/ConvertKit integration
    - Signup form
    - Automated announcements

---

## 5. Horizontal Scrolling Implementation

### Strategy Overview

**Desktop:** True horizontal scrolling with mouse/trackpad  
**Mobile:** Convert to vertical scroll (more natural on touch devices)  
**Implementation:** CSS + JavaScript/GSAP for smooth animations

### Core Implementation Approaches

#### Approach A: CSS-Based Horizontal Scroll (Simple)

**Advantages:**
- No JavaScript required for basic functionality
- Native browser behavior
- Performant
- Good browser support

**Disadvantages:**
- Limited animation control
- Harder to add scroll snap points
- No smooth scroll animations

**Use when:** Simplicity is priority, no complex animations needed

#### Approach B: GSAP ScrollTrigger (Recommended)

**Advantages:**
- Smooth, controlled animations
- Excellent scroll performance
- Easy scroll snap points
- Advanced parallax effects possible
- Works great with touch

**Disadvantages:**
- External library dependency (~47KB gzipped)
- Requires JavaScript knowledge
- More complex setup

**Use when:** Professional, smooth experience required (our case)

#### Approach C: Framer Motion (Alternative)

**Advantages:**
- React-native solution
- Declarative API
- Great for React developers
- Good animation library overall

**Disadvantages:**
- Larger bundle size
- Overkill for simple horizontal scroll
- Less control than GSAP for scroll

**Use when:** Already using Framer Motion extensively

### Recommended Implementation: GSAP ScrollTrigger

**Technical approach:**
1. Create horizontal container with flex layout
2. Use GSAP to pin container on scroll
3. Transform horizontally as user scrolls vertically
4. Add scroll snap for each artwork
5. Enable keyboard navigation
6. Detect touch and enable native swipe

**Key considerations:**
- Calculate total scroll distance based on content width
- Sync scroll position with URL (optional)
- Preload adjacent images
- Disable on mobile (use vertical scroll)

---

## 6. Responsive Design Strategy

### Breakpoints

```css
/* Mobile: Default (no media query) */
320px - 767px: Vertical scroll, full-width images, single column

/* Tablet */
768px - 1023px: Hybrid - maintain horizontal scroll but smaller images

/* Desktop */
1024px - 1439px: Full horizontal scroll experience, optimized images

/* Large Desktop */
1440px+: Same as desktop, max-width container for very large screens
```

### Mobile Behavior

**Decision: Vertical scroll on mobile**

**Rationale:**
- Horizontal scroll feels unnatural on touch devices
- Vertical swipe is native behavior
- Better performance (no JavaScript transformation)
- Easier content consumption

**Implementation:**
```typescript
const isMobile = useMediaQuery('(max-width: 767px)');

return isMobile ? (
  <VerticalGallery artworks={artworks} />
) : (
  <HorizontalGallery artworks={artworks} />
);
```

### Touch Optimization

- Minimum touch target size: 44x44px (Apple HIG)
- Swipe gestures for navigation
- No hover states (use active states)
- Larger tap areas for navigation
- Native momentum scrolling

### Performance on Mobile

- Serve smaller images (max 800px width)
- Reduce JavaScript bundle
- Lazy load aggressively
- Minimize animations
- Test on actual devices

---

## 7. Image Management & Optimization

### Image Requirements

**Source Images (from photographer or artist):**
- Format: RAW or high-quality JPEG
- Resolution: Minimum 3000px on longest side
- Color space: sRGB (for web)
- DPI: 72 (web standard)
- File size: Doesn't matter at source, will be optimized

**Output Images (for website):**

| Use Case | Width (px) | Format | Quality | Est. Size |
|----------|-----------|--------|---------|-----------|
| Thumbnail | 400 | WebP/JPEG | 80% | 20-40KB |
| Gallery (mobile) | 800 | WebP/JPEG | 85% | 80-120KB |
| Gallery (desktop) | 1920 | WebP/JPEG | 85% | 150-250KB |
| Full-screen | 2560 | WebP/JPEG | 90% | 250-400KB |
| Placeholder | 40 | WebP | 60% | 1-2KB |

### Image Processing Workflow

**Step 1: Preparation (Lightroom/Photoshop)**
1. Color correction
2. White balance
3. Crop to desired composition
4. Export as high-quality JPEG (100%, sRGB)

**Step 2: Batch Processing (Sharp/ImageMagick)**
1. Generate responsive sizes (400, 800, 1920, 2560px)
2. Convert to WebP + keep JPEG fallback
3. Optimize file sizes (TinyPNG, Squoosh)
4. Generate blur placeholders (LQIP)

**Step 3: Organization**
```
public/images/work/
  ├── blown-glass/
  │   ├── vessel-001.jpg (1920px)
  │   ├── vessel-001.webp (1920px)
  │   ├── vessel-001-mobile.jpg (800px)
  │   ├── vessel-001-mobile.webp (800px)
  │   ├── vessel-001-thumb.jpg (400px)
  │   └── vessel-001-placeholder.jpg (40px blur)
```

### Image Optimization Tools

**Automated (Recommended):**
- **next/image**: Automatic optimization, WebP conversion, responsive
- **Sharp**: Node.js image processing (very fast)
- **Cloudinary**: Cloud-based image CDN (paid, excellent)

**Manual:**
- **TinyPNG/TinyJPG**: 60-80% size reduction
- **Squoosh**: Google's web app, excellent quality
- **ImageOptim**: Mac app for batch processing

### Next.js Image Component Setup

```typescript
// Example optimized image component
import Image from 'next/image';

<Image
  src="/images/work/blown-glass/vessel-001.jpg"
  alt="Blown glass vessel with cobalt blue gradient"
  width={1920}
  height={1280}
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // generated LQIP
  sizes="(max-width: 768px) 100vw, 
         (max-width: 1024px) 80vw,
         1920px"
  loading="lazy"
  className="artwork-image"
/>
```

### Lazy Loading Strategy

**Above the fold:** Load immediately (first 1-2 images)  
**In viewport:** Load when scrolled into view  
**Adjacent items:** Preload next 2-3 images  
**Off-screen:** Don't load until needed

---

## 8. Performance Optimization

### Performance Budget

| Metric | Target | Critical |
|--------|--------|----------|
| First Contentful Paint (FCP) | < 1.5s | < 2.5s |
| Largest Contentful Paint (LCP) | < 2.5s | < 4.0s |
| Total Blocking Time (TBT) | < 200ms | < 600ms |
| Cumulative Layout Shift (CLS) | < 0.1 | < 0.25 |
| Time to Interactive (TTI) | < 3.5s | < 5.0s |
| Page Weight | < 1.5MB | < 3.0MB |

### Optimization Techniques

#### 1. Code Splitting
```javascript
// Lazy load heavy components
const HorizontalGallery = dynamic(
  () => import('@/components/work/HorizontalGallery'),
  { loading: () => <Loader />, ssr: false }
);
```

#### 2. CSS Optimization
- Use Tailwind's purge to remove unused CSS
- Critical CSS inline in `<head>`
- Non-critical CSS loaded async
- Minimize custom CSS

#### 3. JavaScript Optimization
- Tree-shaking unused code
- Minimize third-party scripts
- Defer non-critical JavaScript
- Use modern ES modules

#### 4. Font Loading
```css
/* Use system fonts or optimize web fonts */
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/your-font.woff2') format('woff2');
  font-display: swap; /* Prevent invisible text */
  unicode-range: U+0000-00FF; /* Load only Latin characters */
}
```

#### 5. Server-Side Rendering (SSR) vs Static Generation (SSG)

**Use SSG (Static Site Generation) for:**
- Portfolio pages (rarely change)
- About page
- CV page
- Homepage

**Use SSR (Server-Side Rendering) for:**
- Contact form (if dynamic)
- Search functionality (future)
- Authentication (future admin panel)

**Implementation:**
```typescript
// Static generation (recommended for portfolio)
export async function generateStaticParams() {
  return [
    { series: 'blown-glass' },
    { series: 'kiln-formed' },
    { series: 'installations' }
  ];
}
```

#### 6. Caching Strategy
- Static assets: 1 year cache (versioned URLs)
- HTML pages: Revalidate every 24 hours
- Images: 1 year cache
- API responses: 5 minutes (if applicable)

#### 7. CDN Configuration
- Use Vercel's Edge Network (automatic with Vercel hosting)
- Or Cloudflare CDN (free tier excellent)
- Serve images from CDN
- Enable Brotli compression

---

## 9. SEO Considerations

### Technical SEO

#### Meta Tags Template
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Artist Name | Glass Artist',
    template: '%s | Artist Name'
  },
  description: 'Contemporary glass artist specializing in blown glass and kiln-formed sculpture. Recent BFA graduate from [University].',
  keywords: ['glass artist', 'blown glass', 'contemporary glass', 'glass sculpture'],
  authors: [{ name: 'Artist Name' }],
  creator: 'Artist Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    title: 'Artist Name | Glass Artist',
    description: 'Contemporary glass artist portfolio',
    siteName: 'Artist Name',
    images: [{
      url: 'https://yourdomain.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Artist Name Glass Art',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artist Name | Glass Artist',
    description: 'Contemporary glass artist portfolio',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};
```

#### Structured Data (Schema.org)

```typescript
// JSON-LD for artist/creator
const artistSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Artist Name",
  "jobTitle": "Glass Artist",
  "url": "https://yourdomain.com",
  "image": "https://yourdomain.com/artist-photo.jpg",
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "University Name"
  },
  "knowsAbout": ["Glass Art", "Blown Glass", "Kiln Forming"],
  "sameAs": [
    "https://instagram.com/yourhandle",
    "https://twitter.com/yourhandle"
  ]
};
```

### Content SEO

**Title optimization:**
- Homepage: "Artist Name | Contemporary Glass Artist | BFA [University]"
- Work pages: "Blown Glass Series | Artist Name"
- About: "About Artist Name | Glass Artist & Educator"

**Image alt text best practices:**
```html
<!-- Bad -->
<img alt="glass piece">

<!-- Good -->
<img alt="Blown glass vessel with cobalt blue gradient, 12 inches tall, 2024">
```

**URL structure:**
```
✓ Good: /work/blown-glass
✗ Bad:  /portfolio?id=123&cat=glass

✓ Good: /exhibitions/2024-spring-show
✗ Bad:  /exhibitions.php?year=2024&season=spring
```

### Sitemap Generation

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/work</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Additional URLs -->
</urlset>
```

**Auto-generate with Next.js:**
```typescript
// app/sitemap.ts
export default async function sitemap() {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // ... more URLs
  ];
}
```

### robots.txt

```
# public/robots.txt
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 10. Deployment Options

### Option A: Vercel (Recommended)

**Advantages:**
- Built for Next.js (same company)
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments for branches
- Excellent free tier

**Process:**
1. Push code to GitHub
2. Connect Vercel to repository
3. Auto-deploy on push to main
4. Custom domain setup in Vercel dashboard

**Pricing:**
- Free: Hobby projects (perfect for portfolio)
- Pro ($20/mo): Custom domains, more bandwidth

### Option B: Netlify

**Advantages:**
- Generous free tier
- Great build system
- Form handling built-in
- Edge functions

**Process:**
1. Push to GitHub/GitLab
2. Connect Netlify
3. Configure build command
4. Deploy

**Pricing:**
- Free: 100GB bandwidth/month
- Pro ($19/mo): More features

### Option C: GitHub Pages (Free, Limited)

**Advantages:**
- Completely free
- Simple static hosting
- Good for basic sites

**Disadvantages:**
- No SSR/SSG build support (need to export static)
- No server-side features
- Limited to static HTML/CSS/JS

**Process:**
1. Build static export: `npm run build && npm run export`
2. Push to gh-pages branch
3. Enable GitHub Pages in settings

### Option D: Self-Hosted (Advanced)

**Platforms:**
- DigitalOcean ($5-12/mo)
- AWS Amplify
- Cloudflare Pages

**Advantages:**
- Full control
- Can be cheaper at scale
- Learning experience

**Disadvantages:**
- More setup required
- Manual SSL configuration
- Need to manage updates

### Recommended Setup

**Primary:** Vercel (free tier)  
**Domain:** Namecheap or Google Domains ($10-15/year)  
**Email:** Google Workspace or ProtonMail ($6-12/mo) or Zoho (free)  
**Backup:** GitHub repository (free)

---

## 11. Step-by-Step Implementation Guide

### Phase 1: Setup & Configuration (Day 1-2)

#### Step 1: Initialize Project

```bash
# Create Next.js project
npx create-next-app@latest glass-portfolio
# Choose: TypeScript, Tailwind CSS, App Router

cd glass-portfolio

# Install dependencies
npm install gsap
npm install react-hook-form
npm install sharp
```

#### Step 2: Configure Next.js

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
```

#### Step 3: Set Up File Structure

```bash
# Create folder structure
mkdir -p src/components/{layout,work,ui,forms}
mkdir -p src/data
mkdir -p src/lib
mkdir -p src/hooks
mkdir -p src/styles
mkdir -p src/types
mkdir -p public/images/{work,about,exhibitions}
```

#### Step 4: Configure Tailwind

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#000000',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### Phase 2: Core Layout (Day 3-4)

#### Step 5: Create Layout Components

**Header Component:**
```typescript
// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-lg font-light">
          Artist Name
        </Link>
        
        <ul className="flex gap-8 text-sm">
          <li><Link href="/work" className="hover:opacity-60 transition">Work</Link></li>
          <li><Link href="/about" className="hover:opacity-60 transition">About</Link></li>
          <li><Link href="/exhibitions" className="hover:opacity-60 transition">Exhibitions</Link></li>
          <li><Link href="/cv" className="hover:opacity-60 transition">CV</Link></li>
          <li><Link href="/contact" className="hover:opacity-60 transition">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
```

**Footer Component:**
```typescript
// src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Artist Name. All rights reserved.</p>
          
          <div className="flex gap-6">
            <a 
              href="https://instagram.com/yourhandle" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              Instagram
            </a>
            <a 
              href="mailto:your@email.com"
              className="hover:text-black transition"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

#### Step 6: Root Layout

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artist Name | Glass Artist',
  description: 'Contemporary glass artist portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

### Phase 3: Data Structure (Day 5)

#### Step 7: Create Data Files

```typescript
// src/types/index.ts
export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  series: string;
  images: {
    full: string;
    thumbnail: string;
    mobile: string;
  };
  alt: string;
  description?: string;
  sold?: boolean;
  exhibitions?: string[];
}

export interface Series {
  slug: string;
  title: string;
  description: string;
  artworks: Artwork[];
}
```

```typescript
// src/data/artworks.ts
import { Series } from '@/types';

export const series: Series[] = [
  {
    slug: 'blown-glass',
    title: 'Blown Glass',
    description: 'Vessels and sculptures created through traditional glassblowing techniques.',
    artworks: [
      {
        id: 'bg-001',
        title: 'Cobalt Vessel',
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
      // More artworks...
    ],
  },
  {
    slug: 'kiln-formed',
    title: 'Kiln-Formed',
    description: 'Cast and fused glass sculptures.',
    artworks: [
      // Artworks...
    ],
  },
];
```

### Phase 4: Horizontal Gallery Component (Day 6-8)

#### Step 8: Build Horizontal Gallery

```typescript
// src/components/work/HorizontalGallery.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Artwork } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalGalleryProps {
  artworks: Artwork[];
}

export default function HorizontalGallery({ artworks }: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const gallery = galleryRef.current;
    
    if (!container || !gallery) return;

    // Calculate total scroll distance
    const scrollWidth = gallery.scrollWidth - window.innerWidth;

    // Create horizontal scroll animation
    const animation = gsap.to(gallery, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [artworks]);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden">
      <div ref={galleryRef} className="flex h-screen items-center gap-8 px-8">
        {artworks.map((artwork, index) => (
          <div
            key={artwork.id}
            className="flex-shrink-0 w-[80vw] md:w-[70vw] lg:w-[60vw] h-[70vh] relative"
          >
            <Image
              src={artwork.images.full}
              alt={artwork.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 80vw, 60vw"
              priority={index < 2} // Prioritize first 2 images
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/90 to-transparent">
              <h3 className="text-lg font-light">{artwork.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {artwork.year} | {artwork.medium} | {artwork.dimensions}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### Step 9: Mobile Vertical Gallery Alternative

```typescript
// src/components/work/VerticalGallery.tsx
'use client';

import Image from 'next/image';
import { Artwork } from '@/types';

interface VerticalGalleryProps {
  artworks: Artwork[];
}

export default function VerticalGallery({ artworks }: VerticalGalleryProps) {
  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="space-y-4">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={artwork.images.mobile}
              alt={artwork.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-light">{artwork.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {artwork.year} | {artwork.medium}
            </p>
            <p className="text-sm text-gray-600">{artwork.dimensions}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

#### Step 10: Responsive Gallery Wrapper

```typescript
// src/components/work/ResponsiveGallery.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Artwork } from '@/types';

const HorizontalGallery = dynamic(() => import('./HorizontalGallery'), {
  ssr: false,
});

const VerticalGallery = dynamic(() => import('./VerticalGallery'));

interface ResponsiveGalleryProps {
  artworks: Artwork[];
}

export default function ResponsiveGallery({ artworks }: ResponsiveGalleryProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? (
    <VerticalGallery artworks={artworks} />
  ) : (
    <HorizontalGallery artworks={artworks} />
  );
}
```

### Phase 5: Pages Implementation (Day 9-11)

#### Step 11: Homepage

```typescript
// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-light mb-6">
          Artist Name
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Contemporary glass artist specializing in blown glass and kiln-formed sculpture
        </p>
        <Link 
          href="/work"
          className="inline-block border border-black px-8 py-3 hover:bg-black hover:text-white transition"
        >
          View Work
        </Link>
      </section>

      {/* Featured Work Preview */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-light mb-12 text-center">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 3 best pieces */}
        </div>
      </section>
    </div>
  );
}
```

#### Step 12: Work/Portfolio Page

```typescript
// src/app/work/page.tsx
import Link from 'next/link';
import { series } from '@/data/artworks';

export default function WorkPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-4xl font-light mb-12">Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {series.map((s) => (
          <Link
            key={s.slug}
            href={`/work/${s.slug}`}
            className="group"
          >
            <div className="aspect-[4/3] relative overflow-hidden mb-4">
              {/* Thumbnail of first artwork in series */}
              <div className="absolute inset-0 bg-gray-100 group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h2 className="text-2xl font-light mb-2">{s.title}</h2>
            <p className="text-gray-600">{s.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

#### Step 13: Dynamic Series Pages

```typescript
// src/app/work/[series]/page.tsx
import { notFound } from 'next/navigation';
import { series as allSeries } from '@/data/artworks';
import ResponsiveGallery from '@/components/work/ResponsiveGallery';

export async function generateStaticParams() {
  return allSeries.map((s) => ({
    series: s.slug,
  }));
}

export default function SeriesPage({ params }: { params: { series: string } }) {
  const series = allSeries.find((s) => s.slug === params.series);

  if (!series) {
    notFound();
  }

  return (
    <div>
      {/* Series Header */}
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-light mb-4">{series.title}</h1>
        <p className="text-gray-600 max-w-2xl">{series.description}</p>
      </div>

      {/* Gallery */}
      <ResponsiveGallery artworks={series.artworks} />
    </div>
  );
}
```

#### Step 14: About Page

```typescript
// src/app/about/page.tsx
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="relative aspect-square">
            <Image
              src="/images/about/artist-photo.jpg"
              alt="Artist Name in studio"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-light mb-6">About</h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              [Artist statement paragraph 1]
            </p>
            <p className="text-gray-700 leading-relaxed">
              [Artist statement paragraph 2]
            </p>
          </div>
        </div>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-light mb-6">Education</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>BFA Glass, 2024</strong> — University Name
            </p>
          </div>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-2xl font-light mb-6">Process</h2>
          <p className="text-gray-700 leading-relaxed">
            [Description of technique and creative process]
          </p>
        </section>
      </div>
    </div>
  );
}
```

#### Step 15: Contact Page

```typescript
// src/app/contact/page.tsx
import ContactForm from '@/components/forms/ContactForm';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-light mb-8">Get in Touch</h1>
        
        <div className="mb-12 space-y-4 text-gray-700">
          <p>
            Available for commissions, collaborations, and exhibitions.
          </p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:your@email.com" className="underline">
              your@email.com
            </a>
          </p>
          <p>
            <strong>Instagram:</strong>{' '}
            <a 
              href="https://instagram.com/yourhandle" 
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              @yourhandle
            </a>
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
```

### Phase 6: Contact Form (Day 12)

#### Step 16: Build Contact Form

```typescript
// src/components/forms/ContactForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="border border-green-500 bg-green-50 p-8 text-center">
        <p className="text-green-800">Thank you! I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm mb-2">Name *</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm mb-2">Email *</label>
        <input
          id="email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm mb-2">Subject</label>
        <input
          id="subject"
          type="text"
          {...register('subject')}
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm mb-2">Message *</label>
        <textarea
          id="message"
          rows={6}
          {...register('message', { required: 'Message is required' })}
          className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-3 hover:bg-gray-800 transition disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

#### Step 17: Contact API Route

```typescript
// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Create transporter (configure with your email service)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio Contact: ${subject || 'No subject'}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject || 'N/A'}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject || 'N/A'}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
```

### Phase 7: Polish & Testing (Day 13-14)

#### Step 18: Add Loading States

```typescript
// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  );
}
```

#### Step 19: Add Error Handling

```typescript
// src/app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-light mb-4">Something went wrong</h2>
        <button
          onClick={reset}
          className="border border-black px-6 py-2 hover:bg-black hover:text-white transition"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

#### Step 20: Add 404 Page

```typescript
// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-light mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link 
          href="/"
          className="border border-black px-6 py-2 hover:bg-black hover:text-white transition inline-block"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
```

---

## 12. Code Examples

### Complete Horizontal Scroll with GSAP

```typescript
// Advanced horizontal scroll implementation with all features

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Artwork } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalGalleryProps {
  artworks: Artwork[];
  onArtworkChange?: (index: number) => void;
}

export default function HorizontalGallery({ 
  artworks, 
  onArtworkChange 
}: HorizontalGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const gallery = galleryRef.current;
    
    if (!container || !gallery) return;

    // Calculate dimensions
    const galleryWidth = gallery.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = galleryWidth - viewportWidth;

    // Create horizontal scroll
    const tween = gsap.to(gallery, {
      x: -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        
        // Track scroll progress
        onUpdate: (self) => {
          const progress = self.progress;
          setProgress(progress);
          
          // Determine current artwork
          const artworkWidth = viewportWidth * 0.7; // 70vw per artwork
          const newIndex = Math.floor((progress * scrollDistance) / artworkWidth);
          const clampedIndex = Math.min(newIndex, artworks.length - 1);
          
          if (clampedIndex !== currentIndex) {
            setCurrentIndex(clampedIndex);
            onArtworkChange?.(clampedIndex);
          }
        },
      },
    });

    // Keyboard navigation
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigateToArtwork(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < artworks.length - 1) {
        navigateToArtwork(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyboard);

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [artworks, currentIndex, onArtworkChange]);

  const navigateToArtwork = (index: number) => {
    const viewportWidth = window.innerWidth;
    const artworkWidth = viewportWidth * 0.7;
    const targetScroll = window.scrollY + (index - currentIndex) * artworkWidth;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-black transition-all duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Artwork counter */}
      <div className="fixed top-24 right-6 text-sm text-gray-600 z-50">
        {currentIndex + 1} / {artworks.length}
      </div>

      {/* Navigation hints */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 text-sm text-gray-600 z-50">
        <span>← → Navigate</span>
        <span>| Scroll</span>
      </div>

      {/* Gallery container */}
      <div ref={containerRef} className="h-screen overflow-hidden">
        <div 
          ref={galleryRef} 
          className="flex h-screen items-center gap-8 px-8"
        >
          {artworks.map((artwork, index) => (
            <article
              key={artwork.id}
              className="flex-shrink-0 w-[70vw] h-[70vh] relative group"
              role="img"
              aria-label={artwork.alt}
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={artwork.images.full}
                  alt={artwork.alt}
                  fill
                  className="object-contain"
                  sizes="70vw"
                  priority={index < 2}
                  quality={85}
                />
              </div>

              {/* Metadata */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-light mb-2">{artwork.title}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{artwork.year}</p>
                  <p>{artwork.medium}</p>
                  <p>{artwork.dimensions}</p>
                  {artwork.description && (
                    <p className="mt-2 text-gray-700">{artwork.description}</p>
                  )}
                </div>
              </div>

              {/* Preload adjacent images */}
              {(index === currentIndex + 1 || index === currentIndex - 1) && (
                <link
                  rel="prefetch"
                  href={artwork.images.full}
                  as="image"
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Custom CSS for Smooth Scrolling

```css
/* src/styles/horizontal-scroll.css */

/* Smooth scrolling behavior */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar but keep functionality */
.hide-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

/* Horizontal scroll container */
.horizontal-scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

/* Artwork items */
.artwork-item {
  scroll-snap-align: center;
  display: inline-block;
  white-space: normal;
}

/* Smooth image loading */
.artwork-image {
  transition: opacity 0.3s ease-in-out;
}

.artwork-image[data-loading="true"] {
  opacity: 0;
}

.artwork-image[data-loading="false"] {
  opacity: 1;
}

/* Responsive utilities */
@media (max-width: 767px) {
  .horizontal-scroll-container {
    overflow-x: hidden;
    overflow-y: auto;
    white-space: normal;
    scroll-snap-type: y mandatory;
  }
  
  .artwork-item {
    display: block;
    scroll-snap-align: start;
  }
}
```

---

## 13. Testing Checklist

### Functionality Testing

- [ ] **Navigation**
  - [ ] All menu links work correctly
  - [ ] Mobile hamburger menu opens/closes
  - [ ] Logo links to homepage
  - [ ] Back button works on all pages

- [ ] **Horizontal Gallery**
  - [ ] Scrolls smoothly with mouse/trackpad
  - [ ] Arrow keys navigate between artworks
  - [ ] Touch swipe works on mobile/tablet
  - [ ] Progress indicator updates correctly
  - [ ] Artwork counter accurate
  - [ ] Metadata displays on hover (desktop)

- [ ] **Images**
  - [ ] All images load correctly
  - [ ] No broken image links
  - [ ] Lazy loading works
  - [ ] Images are appropriately sized
  - [ ] Alt text present on all images

- [ ] **Forms**
  - [ ] Contact form submits successfully
  - [ ] Validation errors display correctly
  - [ ] Success message appears
  - [ ] Email notification received
  - [ ] Form resets after submission

- [ ] **Links & Downloads**
  - [ ] CV PDF downloads correctly
  - [ ] External links open in new tab
  - [ ] Social media links work
  - [ ] Email links trigger mail client

### Performance Testing

- [ ] **Speed**
  - [ ] Lighthouse score > 90 (Performance)
  - [ ] First Contentful Paint < 1.5s
  - [ ] Largest Contentful Paint < 2.5s
  - [ ] Page weight < 2MB (homepage)
  - [ ] Page weight < 3MB (gallery pages)

- [ ] **Optimization**
  - [ ] Images optimized (WebP + JPEG fallback)
  - [ ] Code minified (production build)
  - [ ] Unused CSS removed
  - [ ] JavaScript bundles code-split
  - [ ] Fonts subset and optimized

### Browser Compatibility

Test on these browsers (latest versions):

- [ ] **Desktop**
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] **Mobile**
  - [ ] iOS Safari (iPhone)
  - [ ] Chrome (Android)
  - [ ] Samsung Internet

### Device Testing

- [ ] **Desktop**
  - [ ] 1920x1080 (standard desktop)
  - [ ] 2560x1440 (large desktop)
  - [ ] 1366x768 (small laptop)

- [ ] **Tablet**
  - [ ] iPad (768x1024)
  - [ ] iPad Pro (1024x1366)
  - [ ] Android tablet

- [ ] **Mobile**
  - [ ] iPhone 14 (390x844)
  - [ ] iPhone 14 Pro Max (430x932)
  - [ ] Samsung Galaxy S23 (360x800)
  - [ ] Small phones (320px width)

### Accessibility Testing

- [ ] **Keyboard Navigation**
  - [ ] Can tab through all interactive elements
  - [ ] Focus indicators visible
  - [ ] No keyboard traps
  - [ ] Skip to content link works

- [ ] **Screen Readers**
  - [ ] Headings hierarchical (h1 > h2 > h3)
  - [ ] Alt text descriptive
  - [ ] ARIA labels where needed
  - [ ] Form labels associated correctly

- [ ] **Visual**
  - [ ] Text contrast ratio > 4.5:1
  - [ ] Zoom to 200% doesn't break layout
  - [ ] Color not sole indicator of info
  - [ ] Motion can be reduced (prefers-reduced-motion)

- [ ] **Tools**
  - [ ] Lighthouse Accessibility score > 95
  - [ ] axe DevTools 0 violations
  - [ ] WAVE 0 errors

### SEO Testing

- [ ] **Meta Tags**
  - [ ] Title tags unique per page
  - [ ] Meta descriptions present (< 160 chars)
  - [ ] Open Graph tags configured
  - [ ] Twitter Card tags present
  - [ ] Canonical URLs set

- [ ] **Structure**
  - [ ] Robots.txt present and correct
  - [ ] Sitemap.xml generated and submitted
  - [ ] 404 page functional
  - [ ] URLs semantic and clean
  - [ ] Internal linking logical

- [ ] **Content**
  - [ ] H1 tag on every page
  - [ ] Image alt attributes descriptive
  - [ ] Page load speed optimized
  - [ ] Mobile-friendly (Google test)
  - [ ] Schema.org markup added

### Security Testing

- [ ] **HTTPS**
  - [ ] SSL certificate valid
  - [ ] No mixed content warnings
  - [ ] Security headers configured

- [ ] **Forms**
  - [ ] Contact form has honeypot
  - [ ] Rate limiting on submissions
  - [ ] Input sanitization
  - [ ] CSRF protection (if needed)

- [ ] **Dependencies**
  - [ ] npm audit shows no vulnerabilities
  - [ ] Dependencies up to date
  - [ ] No exposed API keys in code

### Pre-Launch Checklist

- [ ] **Content**
  - [ ] All placeholder text replaced
  - [ ] All images uploaded and optimized
  - [ ] Artist bio finalized
  - [ ] CV up to date
  - [ ] Contact info correct

- [ ] **Configuration**
  - [ ] Custom domain configured
  - [ ] DNS records set
  - [ ] SSL certificate active
  - [ ] Analytics tracking code added
  - [ ] Favicon uploaded

- [ ] **Backup**
  - [ ] Code pushed to GitHub
  - [ ] Environment variables documented
  - [ ] Images backed up
  - [ ] Database exported (if applicable)

- [ ] **Marketing**
  - [ ] Instagram bio updated with link
  - [ ] Email signature updated
  - [ ] Business cards ordered (if needed)
  - [ ] Social media posts scheduled

---

## 14. Maintenance Plan

### Weekly Tasks

- [ ] Check for broken links (use screaming frog or similar)
- [ ] Review analytics for errors or issues
- [ ] Respond to contact form inquiries
- [ ] Check site loads correctly

### Monthly Tasks

- [ ] Update portfolio with new work
- [ ] Review and update CV if needed
- [ ] Check for npm package updates
- [ ] Run Lighthouse audit
- [ ] Review and respond to any feedback
- [ ] Backup website files

### Quarterly Tasks

- [ ] Security audit (npm audit)
- [ ] Performance review (full Lighthouse test)
- [ ] Content refresh (update About page, exhibitions)
- [ ] SEO check (Google Search Console review)
- [ ] Mobile experience review on actual devices
- [ ] Update dependencies to latest stable versions

### Annually Tasks

- [ ] Domain renewal
- [ ] Hosting renewal (if applicable)
- [ ] Full design review
- [ ] Consider adding new features
- [ ] Archive old exhibitions/work
- [ ] Review and update artist statement
- [ ] Professional photography session for new work

### Emergency Procedures

**If site goes down:**
1. Check Vercel/hosting dashboard for status
2. Check domain DNS settings
3. Review recent deployments for issues
4. Rollback to previous version if needed
5. Contact hosting support if unresolved

**If contact form breaks:**
1. Test form submission in different browsers
2. Check API route logs in Vercel
3. Verify email credentials still valid
4. Check spam folder for emails
5. Add temporary email address as fallback

---

## 15. Budget & Timeline Estimates

### Development Costs

| Item | DIY Cost | Hiring Developer |
|------|----------|-----------------|
| Initial Development | $0 (your time) | $2,000 - $5,000 |
| Professional Photography | $300 - $800 | $300 - $800 |
| Domain Name (annual) | $12 - $15 | $12 - $15 |
| Hosting (Vercel free tier) | $0 | $0 |
| Email (optional) | $0 - $72/year | $0 - $72/year |
| **Total Year 1** | **$312 - $887** | **$2,312 - $5,887** |

### Ongoing Costs (Annual)

| Item | Cost |
|------|------|
| Domain renewal | $12 - $15 |
| Hosting (Vercel free tier) | $0 |
| Email (optional) | $0 - $72 |
| Photography session | $300 - $800 |
| **Total Annual** | **$312 - $887** |

### Timeline Estimates

#### DIY Development (Part-time, evenings/weekends)

| Phase | Duration | Tasks |
|-------|----------|-------|
| **Week 1** | Setup & Layout | Project setup, layout components, basic pages |
| **Week 2** | Data & Gallery | Data structure, horizontal gallery component |
| **Week 3** | Pages & Forms | All page templates, contact form, CV page |
| **Week 4** | Polish & Testing | Responsive design, testing, bug fixes |
| **Week 5** | Content & Deploy | Add all images/text, final testing, deploy |
| **Total** | **4-5 weeks** | Ready for launch |

#### Full-time Development

| Phase | Duration | Tasks |
|-------|----------|-------|
| **Days 1-2** | Setup | Project initialization, configuration |
| **Days 3-5** | Core Features | Layout, gallery, responsive design |
| **Days 6-8** | Pages & Content | All pages, forms, integrations |
| **Days 9-10** | Testing & Deploy | Cross-browser testing, optimization, launch |
| **Total** | **2 weeks** | Ready for launch |

#### With Developer (Hired)

| Phase | Duration | Tasks |
|-------|----------|-------|
| **Week 1** | Planning & Design | Gather requirements, design review |
| **Week 2-3** | Development | Core features, testing, revisions |
| **Week 4** | Content & Launch | Content upload, final testing, deploy |
| **Total** | **4 weeks** | Ready for launch |

### Skill Requirements

**Required (Must Have):**
- Basic understanding of HTML/CSS
- Familiarity with command line
- Git/GitHub basics
- Image editing (Lightroom/Photoshop)

**Helpful (Nice to Have):**
- JavaScript/TypeScript knowledge
- React experience
- Understanding of web hosting
- Design sensibility

**Can Learn as You Go:**
- Next.js specifics
- GSAP animations
- Deployment process
- SEO optimization

---

## Next Steps

### Immediate Actions (Do These First)

1. **Gather content**
   - Select 10-15 best artworks per series
   - Write artist bio and statement
   - Prepare CV
   - Collect exhibition information

2. **Professional photography**
   - Schedule photographer OR
   - Learn to photograph work yourself
   - Set up clean white backdrop
   - Ensure consistent lighting

3. **Choose approach**
   - DIY: Begin Next.js tutorial
   - Hire: Start interviewing developers
   - Platform: Sign up for Format trial

4. **Register domain**
   - Buy firstname-lastname.com
   - Or artistname.com
   - Configure email if needed

### Phase 1: Build MVP (Weeks 1-4)

Focus on essentials:
- Homepage with introduction
- One portfolio series with horizontal scroll
- About page
- Contact page
- Mobile responsive

Launch with this, add features later.

### Phase 2: Expand (Weeks 5-8)

Add remaining features:
- Additional portfolio series
- CV page
- Exhibitions page
- Enhanced animations
- Analytics integration

### Phase 3: Optimize (Weeks 9-12)

Polish and improve:
- SEO optimization
- Performance tuning
- A/B testing (if needed)
- User feedback implementation
- Additional content

---

## Resources & Documentation

### Learning Resources

**Next.js:**
- Official Next.js documentation: https://nextjs.org/docs
- Next.js Learn course: https://nextjs.org/learn
- Vercel YouTube channel

**GSAP:**
- GSAP documentation: https://greensock.com/docs/
- ScrollTrigger guide: https://greensock.com/docs/v3/Plugins/ScrollTrigger
- GSAP YouTube channel

**React:**
- Official React documentation: https://react.dev
- React TypeScript Cheatsheet
- Kent C. Dodds blog

**General Web Development:**
- MDN Web Docs: https://developer.mozilla.org
- CSS-Tricks: https://css-tricks.com
- Web.dev (Google): https://web.dev

### Tools & Services

**Development:**
- VS Code: https://code.visualstudio.com
- GitHub: https://github.com
- Vercel: https://vercel.com

**Image Optimization:**
- TinyPNG: https://tinypng.com
- Squoosh: https://squoosh.app
- ImageOptim: https://imageoptim.com (Mac)

**Testing:**
- Lighthouse: Built into Chrome DevTools
- PageSpeed Insights: https://pagespeed.web.dev
- Playwright: https://playwright.dev

**SEO:**
- Google Search Console: https://search.google.com/search-console
- Ahrefs Webmaster Tools: https://ahrefs.com/webmaster-tools

### Community Support

**Where to get help:**
- Stack Overflow (Next.js tag)
- Next.js GitHub Discussions
- Vercel Discord
- GSAP Forums
- Reddit: r/nextjs, r/webdev

---

## Conclusion

This technical plan provides a complete roadmap for building a professional, minimalist horizontal-scrolling portfolio website for a glass artist. The approach emphasizes:

1. **Simplicity** - Clean, artwork-focused design
2. **Performance** - Fast loading, optimized images
3. **Professionalism** - Industry-standard code and practices
4. **Scalability** - Easy to add features and content over time
5. **Maintainability** - Well-organized, documented codebase

### Key Takeaways

- **Start with MVP**: Launch with core features, iterate based on feedback
- **Prioritize images**: Photography quality matters more than fancy code
- **Mobile-first**: Majority of visitors will be on phones
- **Keep it simple**: Resist feature creep, focus on showcasing work
- **Test thoroughly**: Cross-browser, cross-device testing is essential

### Success Metrics

Track these to measure success:
- **Traffic**: Unique visitors, page views
- **Engagement**: Time on site, gallery scrolls
- **Conversions**: Contact form submissions, CV downloads
- **Technical**: Lighthouse scores, load times
- **Opportunities**: Gallery inquiries, exhibition invitations

### Final Thoughts

Building a custom portfolio website is an investment in your professional presence. While platforms like Format offer convenience, a custom build provides:

- Complete creative control
- No monthly fees (after hosting)
- Unique, memorable experience
- Learning opportunity
- Scalability for future needs

The initial time investment (4-5 weeks part-time) creates a foundation that will serve your career for years. With this plan, you have everything needed to build a portfolio website that rivals the best professional examples—including Julie Terestman's beautiful, minimalist design.

Good luck with your build! 🎨✨

---

**Document Version:** 1.0  
**Last Updated:** November 2024  
**Author:** Technical Planning Team  
**License:** Free to use and modify for personal portfolio projects
