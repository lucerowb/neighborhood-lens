export interface PropertyListResponse {
  type: string;
  features: PropertyFeature[];
}

export interface PropertyFeature {
  type: string;
  geometry: Geometry;
  properties: Property;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Property {
  id: string;
  address: string;
  street_address: string;
  county: string;
  city: string;
  state: string;
  state_abbr: string;
  zip_code: string;
  baths: number;
  beds: number;
  sqft: number;
  mls_status: string;
  property_type: string;
  property_sub_type: string;
  list_price: number;
  price_per_sqft: number;
  primary_photo: string;
  photos: Photo[];
  slug: string;
  recent_price: number;
  price_change_days_ago: number;
  year_built: number;
  days_on_market: number;
  single_story: boolean;
  is_featured: boolean;
}

export interface Photo {
  MediaURL: string;
  ShortDescription: any;
  Order: number;
}
