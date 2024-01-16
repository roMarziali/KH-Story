export interface ChapterSectionParagraph {
  id: number,
  text: string,
  image?: {
    "game": string;
    "name": string;
    "alt": string;
    "caption": string;
  }
}
