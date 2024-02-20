import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { HomeMainContentComponent } from './components/main-content.component';
import { StorageService } from "../../services/storage.service";

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterLink, MatButton, HomeMainContentComponent, MatProgressSpinner, MatCard, MatCardContent],
  providers: [StorageService],
  template: `
    <div id="container">
      <div id="content">
        <div id="logo">
          <img alt="angular_logo" src="assets/logo.svg" />
        </div>

        <home-main-content
          (startQuiz)="navigateToQuiz()"
          id="main_card"
          [quizLength]="(quiz$ | async)?.length"
        ></home-main-content>

        <div id="footer">
          <div class="loader">
            @if (!(quiz$ | async)?.length) {
              <mat-spinner color="warn"></mat-spinner>
            }
          </div>

          <mat-card>
            <mat-card-content>
              <span class="icon">🏆</span>

              <h3>Meilleur score</h3>

              @defer (when (quiz$ | async)?.length) {
                <span class="score">{{ storage.getTopScore() }}/{{ (quiz$ | async)?.length }}</span>

              } @placeholder {
                <mat-spinner color="warn"></mat-spinner>
              }

            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styleUrl: './home.view.scss',
})
export class HomeView {
  readonly storage = inject(StorageService);
  readonly quiz$ = inject(QuizService).quiz$;
  readonly router = inject(Router);

  navigateToQuiz() {
    this.router.navigate(['/quiz']);
  }
}
