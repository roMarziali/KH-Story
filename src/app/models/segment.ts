export interface Segment {
  id: number;
  type: string;
  order: number | null;
  texts: Record<string, {
    text: string;
    relatedTo: string[];
  }>;
}
