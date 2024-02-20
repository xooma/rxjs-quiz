import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatChip } from '@angular/material/chips';
import { map, Observable, shareReplay, tap } from 'rxjs';

import { QuizService } from '../../services/quiz.service';
import { StorageService } from '../../services/storage.service';
import { FormatedResults } from '../../interfaces';
import { IsTopScorePipe } from './pipes/is-top-score.pipe';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatChip, AsyncPipe, JsonPipe, IsTopScorePipe],
  providers: [StorageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div id="header"></div>
    <div id="container">
      <div id="left">
        <div>
          <span class="icon">🎉</span>
          <h3 class="bold">Le Quiz est terminé !</h3>
        </div>

        <div class="good_answers">
          <span class="huge_score">{{ numberCorrect$ | async }}/{{ (results$ | async)?.length }}</span>
          <span>réponses justes</span>
        </div>

        <div class="score">
          <p>
            Meilleur score:
            {{ isTopScore$ | async | isTopScore: (numberCorrect$ | async) }}/{{ (results$ | async)?.length }}
          </p>

          @if (isTopScore$ | async) {
            <mat-chip highlighted>New !</mat-chip>
          }
        </div>
      </div>

      <div id="right">
        <h3 class="bold">Détail des résultats :</h3>
        <ul>
          @for (result of results$ | async; track result) {
            <li>
              {{ result.question }}<span>{{ result.correct ? '✅' : '❌' }}</span>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./results.view.scss'],
})
export class ResultsView {
  readonly storage = inject(StorageService);
  readonly results$: Observable<Array<FormatedResults>> = inject(QuizService).formatedResults$;
  readonly numberCorrect$: Observable<number> = this.results$.pipe(
    map((results: Array<FormatedResults>) => results.filter((r) => r.correct).length),
    shareReplay(),
  );
  readonly isTopScore$: Observable<boolean> = this.numberCorrect$.pipe(
    map((score) => this.mergeWithTopScore(score)),
    tap(({ score, isTopScore }) => {
      if (isTopScore) this.storage.saveTopScore(score);
    }),
    map(({ isTopScore }) => isTopScore),
    shareReplay(),
  );

  private mergeWithTopScore(score: number) {
    const isTopScore = score > +this.storage.getTopScore();
    return { score, isTopScore };
  }
}
