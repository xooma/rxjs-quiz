export interface QuestionBase {
  label: string;
}

export interface ChoiceQuestion extends QuestionBase {
  answerType: 'choice';
  choices: string[];
  answer: string;
}

export interface TextQuestion extends QuestionBase {
  answerType: 'text';
  answer: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  answerType: 'multiple-choice';
  choices: string[];
  answers: string[];
}

export type Question = ChoiceQuestion | TextQuestion | MultipleChoiceQuestion;
