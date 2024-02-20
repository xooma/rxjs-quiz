import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { API_BASE_URL } from './interfaces';
import { QuizService } from './services/quiz.service';
import { HttpService } from "./services/http.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    QuizService,
    HttpService,
    { provide: API_BASE_URL, useValue: 'https://storage.googleapis.com/netwo-public/quizz.json' },
  ],
};
