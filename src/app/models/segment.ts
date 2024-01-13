export interface Segment {
  id: number;
  type: string;
  order: number | null;
  text?  :string;
  texts?: Record<string, {
    text: string;
    relatedTo: string[];
  }>;
  image?: {
    "game": string;
    "name": string;
    "alt": string;
    "caption": string;
  }
}
