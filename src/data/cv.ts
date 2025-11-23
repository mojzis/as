import { CVEntry } from '@/types';

export const cvEntries: CVEntry[] = [
  // Education
  {
    year: '2024',
    title: 'BFA, Glass',
    venue: 'University Name',
    location: 'City, State',
    category: 'education',
  },

  // Exhibitions
  {
    year: '2024',
    title: 'BFA Thesis Exhibition',
    venue: 'University Gallery',
    location: 'City, State',
    category: 'exhibitions',
  },
  {
    year: '2024',
    title: 'Emerging Glass Artists',
    venue: 'Contemporary Glass Gallery',
    location: 'City, State',
    category: 'exhibitions',
  },
  {
    year: '2023',
    title: 'Annual Student Exhibition',
    venue: 'School of Art Gallery',
    location: 'City, State',
    category: 'exhibitions',
  },

  // Awards
  {
    year: '2024',
    title: 'Excellence in Glass Award',
    venue: 'University Name',
    category: 'awards',
  },
  {
    year: '2023',
    title: 'Juried Show Honorable Mention',
    venue: 'Regional Art Center',
    category: 'awards',
  },

  // Experience
  {
    year: '2023-2024',
    title: 'Studio Assistant',
    venue: 'Glass Studio Name',
    location: 'City, State',
    category: 'experience',
  },
  {
    year: '2022-2024',
    title: 'Teaching Assistant, Introduction to Glass',
    venue: 'University Name',
    category: 'experience',
  },
];

export function getCVByCategory(category: CVEntry['category']): CVEntry[] {
  return cvEntries.filter((entry) => entry.category === category);
}
