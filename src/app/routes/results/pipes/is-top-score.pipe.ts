import { inject, Input, Pipe, PipeTransform } from "@angular/core";
import { StorageService } from "../../../services/storage.service";

@Pipe({
  name: 'isTopScore',
  standalone: true
})
export class IsTopScorePipe implements PipeTransform {
  private readonly storage = inject(StorageService);

  transform(isTopScore: boolean | null, numberCorrect: number | null): unknown {
    return isTopScore ? numberCorrect : this.storage.getTopScore()
  }
}
