import { RawSection } from "./raw-section";
export interface RawChapter {
  order: number,
  title: string,
  sections: RawSection[]
}
