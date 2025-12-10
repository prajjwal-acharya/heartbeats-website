export interface Song {
  id: string;
  title: string;
  duration: string;
  plays: string;
}

export interface TourDate {
  id: string;
  date: string;
  city: string;
  venue: string;
  available: boolean;
}

export interface LyricGenerationResponse {
  lyrics: string;
  title?: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}