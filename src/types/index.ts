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
  coverImage: string;
  artworks: Artwork[];
}

export interface Exhibition {
  id: string;
  title: string;
  venue: string;
  location: string;
  startDate: string;
  endDate?: string;
  description?: string;
  type: 'solo' | 'group' | 'juried';
  upcoming?: boolean;
}

export interface CVEntry {
  year: string;
  title: string;
  venue?: string;
  location?: string;
  category: 'education' | 'exhibitions' | 'awards' | 'publications' | 'collections' | 'experience';
}
