export interface Video {
  _id: string;
  url: string;
  title: string;
  date: string;
  description: string;
  duration: number;
  beginning: string;
  partNumber: number;
  location: string;
  tags: string[];
  people: string[];
  notes: string;
}
