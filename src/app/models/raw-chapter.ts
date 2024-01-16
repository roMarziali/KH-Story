import { RawSection } from "./raw-section";
export interface RawChapter {
  id: number,
  order: number,
  title: string,
  sections: RawSection[]
}
