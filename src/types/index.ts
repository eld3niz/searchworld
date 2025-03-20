export interface User {
  id: string;
  email: string;
  name: string;
  country: string;
  languages: string[];
  show_on_map: boolean;
  latitude?: number;
  longitude?: number;
  created_at: string;
}

export interface MapMarker {
  id: string;
  name: string;
  country: string;
  languages: string[];
  latitude: number;
  longitude: number;
}

export interface FilterOptions {
  distance?: number;
  languages: string[];
}
