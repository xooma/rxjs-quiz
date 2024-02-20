import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'quiz-header',
  standalone: true,
  imports: [MatCard, MatCardContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div id="header">
      <mat-card>
        <mat-card-content class="label">
          <span>Question {{ currentQuestion }}/{{ totalQuestions }}</span>
        </mat-card-content>
      </mat-card>

      <mat-card class="timer">
        <mat-card-content>
          <span>{{ timer }}</span>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      #header {
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 4rem;
        background-image: radial-gradient(circle, rgba(37, 37, 200, 1) 0%, rgba(9, 9, 121, 1) 100%);

        & mat-card-content {
          padding: 1rem 0.5rem !important;
          font-size: 1.8rem;
        }

        & .timer {
          min-width: 100px;
          text-align: center;
        }
      }
    `,
  ],
})
export class QuizHeaderComponent {
  @Input({ required: true }) currentQuestion: number | undefined;
  @Input({ required: true }) totalQuestions: number | undefined;
  @Input({ required: true }) timer: string | undefined;
}
