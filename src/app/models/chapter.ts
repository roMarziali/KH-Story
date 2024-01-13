import { Segment } from "./segment";

export interface Chapter {
  order: number;
  title: string;
  segments: Segment[];
}
