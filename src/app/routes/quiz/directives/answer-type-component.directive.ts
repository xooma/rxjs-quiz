import { ComponentRef, Directive, effect, inject, input, Type, ViewContainerRef } from '@angular/core';
import { TextQuestionComponent } from '../components/text-question.component';
import { ChoiceQuestionComponent } from '../components/choice-question.component';
import { Question } from "../../../interfaces";
import { MultipleChoiceQuestionComponent } from '../components/multiple-choice-question.component';

@Directive({
  selector: '[answerTypeComponent]',
  standalone: true,
})
export class AnswerTypeComponentDirective {
  private readonly vcr = inject(ViewContainerRef);

  currentQuestion = input.required<Question | null>({ alias: 'answerTypeComponent' });

  answerTypeToComponent: Map<'text' | 'choice' | 'multiple-choice', Type<any>> = new Map<
    'text' | 'choice' | 'multiple-choice',
    Type<any>
  >([
    ['text', TextQuestionComponent],
    ['choice', ChoiceQuestionComponent],
    ['multiple-choice', MultipleChoiceQuestionComponent],
  ]);

  constructor() {
    effect(() => {
      if (!this.currentQuestion()?.answerType) return;

      this.vcr.clear();

      const component = this.answerTypeToComponent.get(this.currentQuestion()!.answerType);
      const componentRef: ComponentRef<unknown> = this.vcr.createComponent(component!);

      componentRef.setInput('question', this.currentQuestion());
    });
  }
}
