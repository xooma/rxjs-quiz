import { ChangeDetectionStrategy, Component, Input, Optional, SkipSelf } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { ControlContainer, FormsModule } from '@angular/forms';

import { ChoiceQuestion } from "../../../interfaces";

@Component({
  selector: 'quiz-choice-question',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatRadioGroup, MatRadioButton, FormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      deps: [[new SkipSelf(), Optional, ControlContainer]],
      useFactory: (controlContainer: ControlContainer) => controlContainer,
    },
  ],
  template: `
    @defer (when question?.choices?.length) {
        <mat-radio-group [name]="question!.label" ngModel required>
          @for (choice of question!.choices; track question!.choices.indexOf(choice)) {
            <div class="item">
              <mat-radio-button labelPosition="before" [value]="choice">{{ choice }}</mat-radio-button>
            </div>
          }
        </mat-radio-group>
    }
  `,
  styles: [
    `
      mat-radio-group {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 70vw;
        gap: 20px;
      }

      .item {
        flex: 0 0 calc(50% - 20px);
        box-sizing: border-box;
        padding: 10px;
        background-color: #e1f1ff;
        border-radius: 5px;
      }

      :host ::ng-deep {
        & .mdc-label {
          margin-left: 0 !important;
          margin-right: 0 !important;
          width: 100%;
        }

        & .mdc-form-field {
          display: flex;
        }
      }
    `,
  ],
})
export class ChoiceQuestionComponent {
  @Input() question: ChoiceQuestion | undefined;
}
