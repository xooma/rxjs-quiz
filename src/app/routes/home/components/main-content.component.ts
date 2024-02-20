import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'home-main-content',
  standalone: true,
  imports: [MatCardTitle, MatCardContent, MatCardFooter, MatButton, MatCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>
        <span>
          @defer (when !!quizLength) {
            {{ quizLength }} questions
          }
        </span>
      </mat-card-title>
      <mat-card-content>
        <h1>Mon test technique</h1>
      </mat-card-content>

      <mat-card-footer>
        <button (click)="startQuiz.emit()" [disabled]="!quizLength" color="primary" mat-flat-button>Démarrer</button>
      </mat-card-footer>
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 80%;
        min-width: 50%;
        padding: 1.2rem;

        & > mat-card-content,
        mat-card-title,
        mat-card-footer {
          display: flex;
          justify-content: center;
          align-content: center;
          height: 100%;
          vertical-align: baseline;

          & > h1 {
            justify-self: center;
          }

          & > span {
            min-height: 2rem;
            margin: auto;
          }
        }
      }

      button {
        width: 200px;
        height: 60px;
        font-size: 1.5rem;
        text-transform: uppercase;
      }
    `,
  ],
})
export class HomeMainContentComponent {
  @Input({ required: true }) quizLength: number | undefined;
  @Output() readonly startQuiz: EventEmitter<void> = new EventEmitter<void>();
}
