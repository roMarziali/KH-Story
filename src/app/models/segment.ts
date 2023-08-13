export interface Segment {
  id: number;
  content: {
    type: string;
    order: string;
    texts: Record<string, {
      text: string;
      relatedTo: string[];
    }>;
  };
}
