
export interface Visibility {
  id: string;
  type: string
  label: string;
  options?: {
    [key: string]: string
  }
  value: string | boolean | number;
}
