export interface Resource {
  title: string;
  type: string;
  url: string;
}

export interface Question {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Quiz {
  title: string;
  instructions: string;
  questions: Question[];
}

export interface Exercise {
  title: string;
  instructions: string;
  modelAnswer: string;
}

export interface Section {
  id: string;
  number: string;
  title: string;
  overview: string;
  resources: Resource[];
  quiz: Quiz;
  exercise: Exercise;
}

export type SectionsData = Record<string, Section>;
