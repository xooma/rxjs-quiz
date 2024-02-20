import { Injectable } from "@angular/core";

@Injectable()
export class StorageService {
  saveTopScore(value: number) {
    const actualTopScore = this.getTopScore();
    const newTopScore = actualTopScore ? +actualTopScore < value : true;

    if (newTopScore) {
      localStorage.setItem('TOP_SCORE', value.toString());
    }
  }

  getTopScore() {
    return localStorage.getItem('TOP_SCORE') ?? 0;
  }
}
