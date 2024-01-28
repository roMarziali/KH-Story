export interface RawSection {
  id: number,
  order: number,
  title: string,
  paragraphs: RawParagraph[];
}

export interface RawParagraph{
  id: number,
  order: number,
  texts: {
    id: number,
    text: string,
    relatedTo: string[],
    image?: {
      "game": string;
      "name": string;
      "alt": string
    }
  }[]
}
