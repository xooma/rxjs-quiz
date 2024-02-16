import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>
      results works!
    </p>
  `,
  styles: ``
})
export class ResultsView {

}
