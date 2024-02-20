import { ChangeDetectionStrategy, Component, Input, Optional, SkipSelf } from '@angular/core';
import { ControlContainer, FormsModule } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

import { MultipleChoiceQuestion } from "../../../interfaces";

@Component({
  selector: 'quiz-multiple-choice-question',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FormsModule, MatCheckbox],
  viewProviders: [
    {
      provide: ControlContainer,
      deps: [[new SkipSelf(), Optional, ControlContainer]],
      useFactory: (controlContainer: ControlContainer) => controlContainer,
    },
  ],
  template: `
    @defer (when question?.choices?.length) {
      <div id="container" [ngModelGroup]="question!.label">
        @for (choice of question?.choices; track question?.choices!.indexOf(choice)) {
          <mat-checkbox
            labelPosition="before"
            class="item"
            (change)="addSelectionToFormValue($event, choice)"
            >{{ choice }}
          </mat-checkbox>
        }
      </div>
    }
  `,
  styles: [
    `
      #container {
        display: flex;
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
export class MultipleChoiceQuestionComponent {
  @Input() question: MultipleChoiceQuestion | undefined;

  constructor(@SkipSelf() private controlContainer: ControlContainer) {}

  addSelectionToFormValue(event: MatCheckboxChange, choice: string): void {
    let currentFormValues = this.controlContainer.value[this.question!.label];

    if (!currentFormValues.length) currentFormValues = [];

    if (event.checked) {
      currentFormValues.push(choice);
    } else {
      const index = currentFormValues.indexOf(choice);

      if (index > -1) {
        currentFormValues.splice(index, 1);
      }
    }

    this.controlContainer.value[this.question!.label] = currentFormValues;
  }
}
