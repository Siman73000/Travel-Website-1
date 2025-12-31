export type Region =
  | "North America"
  | "Central America"
  | "South America"
  | "Europe"
  | "Africa"
  | "Asia"
  | "Oceania"
  | "Middle East";

export type LocationEntry = {
  id?: string;
  slug: string;
  name: string;
  region: Region | string;
  country?: string | null;
  blurb?: string | null;
  highlights?: string[] | null;
  featured?: boolean | null;
  sort?: number | null;
};
