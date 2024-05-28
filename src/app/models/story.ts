export interface Story {
  chapters: Chapter
}

export interface Chapter {
  id: number,
  order: number,
  title: string,
  sections: ChapterSection[],
}

export interface ChapterSection {
  id: number,
  order: number,
  title: string,
  paragraphs: Paragraph[]
}

export interface Paragraph {
  id: number,
  order: number,
  text: string,
  images?: Image[]
}

export interface Image {
  game: string;
  name: string;
  alt: string;
}
