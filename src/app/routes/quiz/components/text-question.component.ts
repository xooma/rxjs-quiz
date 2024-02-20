import { ChangeDetectionStrategy, Component, ElementRef, Input, Optional, SkipSelf, ViewChild } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ControlContainer, FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

import { TextQuestion } from '../../../interfaces/question.interface';

@Component({
  selector: 'quiz-text-question',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCheckbox, MatFormField, FormsModule, MatInput, MatLabel, CdkTrapFocus],
  viewProviders: [
    {
      provide: ControlContainer,
      deps: [[new SkipSelf(), Optional, ControlContainer]],
      useFactory: (controlContainer: ControlContainer) => controlContainer,
    },
  ],
  template: `
    @defer (when !!question?.label) {
      <mat-form-field appearance="outline">
        <mat-label>Votre réponse</mat-label>
        <input #input required type="text" matInput ngModel [name]="question!.label" />
      </mat-form-field>
    }
  `,
  styles: [
    `
      mat-form-field {
        width: 70vw;
      }
    `,
  ],
})
export class TextQuestionComponent {
  @ViewChild('input') set input(input: ElementRef) {
    if (input) input.nativeElement.focus();
  }

  @Input() question: TextQuestion | undefined;
}
