import { ChapterSection } from "./chapter-section";
export interface Chapter {
  id: number,
  order: number,
  title: string,
  sections: ChapterSection[];
}
