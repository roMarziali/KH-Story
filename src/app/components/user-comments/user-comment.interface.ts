export interface UserComment {
  id: number;
  userName?: string;
  comment: string;
  date: Date;
  antispamQuestions: AntispamQuestions;
}

export interface AntispamQuestions {
  id: number;
  question: string;
  answer: string;
}

