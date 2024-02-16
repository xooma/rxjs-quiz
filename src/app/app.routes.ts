import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./routes/home/home.view').then(v => v.HomeView) },
  { path: 'quiz', loadComponent: () => import('./routes/quiz/quiz.view').then(v => v.QuizView) },
  // TODO: Guard results
  { path: 'results', loadComponent: () => import('./routes/results/results.view').then(v => v.ResultsView) }
];
