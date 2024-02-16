import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>
      quiz works!
    </p>
  `,
  styles: [``],
})
export class QuizView {}
