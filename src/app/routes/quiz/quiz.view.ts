import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  finalize,
  map,
  mergeMap,
  Observable,
  switchMap,
  take,
  takeWhile,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';

import { QuizHeaderComponent } from './components/quiz-header.component';
import { Question, Results } from "../../interfaces";
import { AnswerTypeComponentDirective } from './directives/answer-type-component.directive';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [AsyncPipe, QuizHeaderComponent, MatButton, AnswerTypeComponentDirective, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div id="container">
      <quiz-header
        [totalQuestions]="(quiz$ | async)?.length"
        [currentQuestion]="(currentQuestionNumber | async)!"
        [timer]="(timer | async)!"
      ></quiz-header>

      <form #form="ngForm">
        <div class="label">
          {{ (currentQuestion | async)?.label }}
        </div>

        <ng-container>
          <div class="input" [answerTypeComponent]="currentQuestion | async"></div>
        </ng-container>

        <div class="validation">
          <button mat-raised-button color="primary" (click)="updateFormValue(form.value)">Valider</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./quiz.view.scss'],
})
export class QuizView {
  @ViewChild('form') form: NgForm | undefined;
  private readonly quizService = inject(QuizService);

  readonly quiz$ = this.quizService.quiz$;
  readonly results = this.quizService.results;
  readonly currentQuestionNumber: BehaviorSubject<number> = new BehaviorSubject(1);

  private readonly router = inject(Router);
  private readonly resetTimer = new BehaviorSubject<void>(undefined);

  readonly timer = this.resetTimer.asObservable().pipe(
    switchMap(() => timer(0, 1000).pipe(map((val) => 120 - val))),
    takeWhile((timeLeft) => timeLeft > 0),
    map((val) => val.toString().padStart(4, '0')),
    finalize(() => this.navigateToResults()),
  );

  readonly currentQuestion: Observable<Question> = combineLatest([this.quiz$, this.currentQuestionNumber]).pipe(
    map(([quiz, questionNumber]) => quiz[questionNumber - 1]),
  );

  updateFormValue(formValue: Results) {
    this.results
      .asObservable()
      .pipe(
        take(1),
        tap((value) => this.saveResults({ ...formValue, ...value })),
        mergeMap(() => this.nextQuestion()),
      )
      .subscribe();
  }

  private nextQuestion() {
    return this.quiz$.pipe(
      filter(() => !!this.form!.valid),
      map((quiz) => quiz.length),
      withLatestFrom(this.currentQuestionNumber),
      tap(([quizLength, currentQuestionNumber]) => {
        if (currentQuestionNumber < quizLength) {
          this.currentQuestionNumber.next(currentQuestionNumber + 1);
          this.resetTimer.next();
        } else this.navigateToResults();
      }),
    );
  }

  private saveResults(value: Results) {
    this.results.next(value);
  }

  private navigateToResults() {
    this.router.navigate(['/results']);
  }
}
