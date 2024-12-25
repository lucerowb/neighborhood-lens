type PlaceCategoryIcon = {
  mapPrefix: string;
  prefix: string;
  suffix: string;
};

type PlaceFeatures = {
  payment?: {
    credit_cards?: {
      visa?: boolean;
      master_card?: boolean;
      accepts_credit_cards?: boolean;
    };
  };
  services?: {
    dine_in?: {
      reservations?: boolean;
    };
  };
  amenities?: {
    wifi?: string;
  };
  food_and_drink?: {
    alcohol?: {
      full_bar?: boolean;
    };
  };
};

type PlacePhoto = {
  id: string;
  width: number;
  height: number;
  prefix: string;
  suffix: string;
  created_at: string;
};

export type Place = {
  id: number;
  fsq_id: string;
  name: string;
  property_ids: string[];
  category_id: number;
  category_name: string;
  category_icon: PlaceCategoryIcon;
  coordinates: {
    x: number;
    y: number;
  };
  distance?: string;
  rating?: string;
  address?: string;
  photos?: PlacePhoto[];
  features?: PlaceFeatures;
};
