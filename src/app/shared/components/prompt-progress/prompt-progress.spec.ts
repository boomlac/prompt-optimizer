import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptProgress } from './prompt-progress';

describe('PromptProgress', () => {
  let component: PromptProgress;
  let fixture: ComponentFixture<PromptProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptProgress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
