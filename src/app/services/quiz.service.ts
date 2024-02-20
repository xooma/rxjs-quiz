import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, withLatestFrom } from 'rxjs';

import { ChoiceQuestion, MultipleChoiceQuestion, Question, Results, FormatedResults } from "../interfaces";
import { HttpService } from "./http.service";

@Injectable()
export class QuizService {
  readonly quiz$: Observable<Array<Question>> = inject(HttpService).getQuiz().pipe(shareReplay());

  readonly results: BehaviorSubject<Results> = new BehaviorSubject<Results>({});
  readonly formatedResults$: Observable<Array<FormatedResults>> = this.results
    .asObservable()
    .pipe(
      withLatestFrom(this.quiz$),
      map(([results, questions]) => this.mapToFormatedResults(results, questions)),
    );

  private mapToFormatedResults(results: Results, questions: Array<Question>) {
    return questions.map((question) => {
      const answer = results[question.label];
      return this.formatResult(question, answer);
    });
  }

  private formatResult(question: Question, answer: string | Array<string>): FormatedResults {
    let correct = false;

    if (question.answerType === 'multiple-choice') correct = this.isMultipleChoiceCorrect(question, answer);
    else correct = this.isSingleChoiceCorrect(question as ChoiceQuestion, answer);

    return { question: question.label, correct };
  }

  private isMultipleChoiceCorrect(question: MultipleChoiceQuestion, answer: string | Array<string>): boolean {
    return Array.isArray(answer) && question.answers.every((a) => answer.includes(a));
  }

  private isSingleChoiceCorrect(question: ChoiceQuestion, answer: string | Array<string>): boolean {
    return question.answer === answer;
  }
}
