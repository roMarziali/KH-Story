import { ChapterSectionParagraph } from "./chapter-section-paragraph";

export interface ChapterSection {
  id: number,
  title: string,
  paragraphs: ChapterSectionParagraph[]
}
