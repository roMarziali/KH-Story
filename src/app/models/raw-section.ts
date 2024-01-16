export interface RawSection {
  id: number,
  order: number,
  title: string,
  paragraphs: {
    id: number,
    order: number,
    texts: {
      id: number,
      text: string,
      relatedTo: string[],
      image?: {
        "game": string;
        "name": string;
        "alt": string;
        "caption": string;
      }
    }[]
  }[];
}
