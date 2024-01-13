export interface RawChapter {
  order: number,
  title: string,
  sections: {
    order : number,
    title: string,
    paragraphs: {
      order : number,
      texts: {
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
  }[]
}
