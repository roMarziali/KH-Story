export interface ChapterSectionParagraph {
  id: number,
  text: string,
  image?: Image,
}

export interface Image{
  game: string;
  name: string;
  alt: string;
}
