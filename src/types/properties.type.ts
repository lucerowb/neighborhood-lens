type PropertyFeatureGeometry = {
  type: "Point";
  coordinates: [-80.289991, 25.9262811];
};

type LocalStats = {
  id: number;
  property_id: string;
  minResponseCount: number;
  stats: {
    label: string;
    score: number;
    identifier: string;
  }[];
};

export type PropertyPhoto = {
  MediaURL: string;
  ShortDescription?: string;
  Order: number;
};

type ListingAgentMeta = {
  list_agent_key: string;
  list_office_key: string;
  list_agent_email: string;
  list_office_name: string;
  list_agent_mls_id: string;
  list_office_email?: string;
  list_office_phone: string;
  list_office_mls_id: string;
  list_agent_fullname: string;
  list_agent_key_numeric?: string;
  list_agent_direct_phone: string;
};

type Financials = {
  owner_pays?: number;
  gross_income?: number;
  buyer_financing?: number;
  insurance_expense?: number;
  operating_expense?: number;
  original_list_price: number;
  previous_list_price: number;
};

type HOAMeta = {
  association_name?: string;
  association_phone?: string;
  association_fee_includes?: string;
};

type TaxRecord = {
  tax_lot?: string;
  tax_block?: string;
  tax_exemptions: string[];
  legal_description: string;
  tax_annual_amount: number;
  zoning_description?: string;
};

type NearbySchool = {
  high_school?: string;
  elementary_school?: string;
  high_school_district?: string;
  middle_or_junior_school?: string;
  elementary_school_district?: string;
  middle_or_junior_school_district?: string;
};

export type Property = {
  id: string;
  photos: PropertyPhoto[];
  primary_photo: string;
  slug: string;
  recent_price: number;
  price_change_days_ago: number;
  created_at?: string;
  modified_at?: string;
  meta?: unknown;
  originating_system_name?: string;
  originating_system_id?: string;
  data_source?: string;
  listing_id?: string;
  listing_key?: string;
  listing_key_numeric?: number;
  listing_agent_meta?: ListingAgentMeta;
  latitude?: number;
  longitude?: number;
  county: string;
  city: string;
  state_abbr: string;
  state: string;
  country?: string;
  zip_code: string;
  street_address: string;
  directions?: null;
  address: string;
  subdivision_name?: string;
  zoning_description?: null;
  property_type: string;
  property_sub_type: string;
  beds: number;
  garage?: number;
  parking?: number;
  baths: number;
  baths_full?: number;
  baths_half?: number;
  sqft: number;
  lot_sqft?: number;
  stories?: number;
  year_built: number;
  unit_number?: number;
  units?: number;
  description?: string;
  list_price: number;
  last_sold_date?: null;
  last_sold_price?: number;
  financials?: Financials;
  hoa?: null;
  hoa_frequency?: number;
  hoa_normalized?: number;
  hoa_meta?: HOAMeta;
  list_datetime_on_market?: string;
  bridge_modification_timestamp?: string;
  photos_change_timestamp?: string;
  mls_status: string;
  status?: string;
  interior_features?: string[];
  appliances?: string[];
  security_features?: string[];
  other_equipment?: string[];
  window_features?: string[];
  door_features?: string[];
  flooring?: string[];
  basement_yn?: null;
  basement?: null;
  spa_yn?: null;
  entry_location?: null;
  heating?: string[];
  cooling?: string[];
  fireplace_features?: string[];
  laundry_features?: string[];
  spa_features?: string[];
  foundation_details?: string;
  exterior_features?: string[];
  roof?: string[];
  patio_and_porch_features?: [];
  pool_features?: [];
  pool_private_yn?: false;
  view_yn?: false;
  view?: string[];
  waterfront_yn?: false;
  waterfront_features?: [];
  fencing?: string[];
  attached_garage_yn?: null;
  parking_features?: string[];
  building_features?: string[];
  construction_materials?: string[];
  lot_features?: string[];
  other_structures?: string[];
  architectural_style?: string[];
  senior_community_yn?: null;
  community_features?: [];
  association_amenities?: [];
  road_surface_type?: [];
  association_fee_includes?: null;
  utilities?: [];
  sewer?: [];
  new_construction_yn?: false;
  virtual_tour_url_branded?: null;
  virtual_tour_url_unbranded?: string;
  has_pool?: false;
  pets_allowed?: false;
  is_furnished?: false;
  has_cooling?: true;
  has_heating?: true;
  has_fireplace?: false;
  tax_record?: TaxRecord;
  reso_dump?: unknown;
  nearby_schools?: NearbySchool;
  tax_history?: null;
  description_keywords?: null;
  unmapped_property_keywords?: null;
  property_keywords?: null;
  property_highlights?: null;
  amenities?: string[];
  house_qualities?: string[];
  parking_hoa_school?: string[];
};

export type PropertyFeatures = {
  type: "Feature";
  geometry: PropertyFeatureGeometry;
  properties: Property;
  localStats?: LocalStats;
};

export type PropertiesResponse = {
  type: "FeatureCollection";
  features: PropertyFeatures[];
};
