import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizView } from './quiz.view';

describe('QuizComponent', () => {
  let component: QuizView;
  let fixture: ComponentFixture<QuizView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizView]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuizView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
