import { Exhibition } from '@/types';

export const exhibitions: Exhibition[] = [
  {
    id: 'ex-001',
    title: 'BFA Thesis Exhibition',
    venue: 'University Gallery',
    location: 'City, State',
    startDate: '2024-05-01',
    endDate: '2024-05-15',
    description: 'Culminating exhibition of undergraduate thesis work.',
    type: 'solo',
  },
  {
    id: 'ex-002',
    title: 'Emerging Glass Artists',
    venue: 'Contemporary Glass Gallery',
    location: 'City, State',
    startDate: '2024-03-10',
    endDate: '2024-04-20',
    description: 'Group exhibition featuring emerging talent in contemporary glass.',
    type: 'group',
  },
  {
    id: 'ex-003',
    title: 'Annual Student Exhibition',
    venue: 'School of Art Gallery',
    location: 'City, State',
    startDate: '2023-12-01',
    endDate: '2023-12-15',
    type: 'juried',
  },
];

export const upcomingExhibitions: Exhibition[] = [
  {
    id: 'ex-upcoming-001',
    title: 'New Glass Now',
    venue: 'Regional Art Center',
    location: 'City, State',
    startDate: '2025-02-01',
    endDate: '2025-03-15',
    type: 'group',
    upcoming: true,
  },
];
