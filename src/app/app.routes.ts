import { Routes } from '@angular/router';
import {redirectHomeGuard} from "./guards/redirect-home.guard";

export const routes: Routes = [
  { path: '', loadComponent: () => import('./routes/home/home.view').then(v => v.HomeView) },
  { path: 'quiz', loadComponent: () => import('./routes/quiz/quiz.view').then(v => v.QuizView), canActivate: [redirectHomeGuard] },
  { path: 'results', loadComponent: () => import('./routes/results/results.view').then(v => v.ResultsView), canActivate: [redirectHomeGuard] }
];
