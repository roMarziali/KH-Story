import { ChapterSection } from "./chapter-section";
export interface Chapter {
  order: number,
  title: string,
  sections: ChapterSection[];
}
