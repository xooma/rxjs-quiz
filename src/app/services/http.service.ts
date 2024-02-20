import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay } from "rxjs";

import { API_BASE_URL, Question } from "../interfaces";

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) {}
  getQuiz() {
    return this.httpClient.get<Array<Question>>(inject(API_BASE_URL)).pipe(delay(2000));
  }
}
