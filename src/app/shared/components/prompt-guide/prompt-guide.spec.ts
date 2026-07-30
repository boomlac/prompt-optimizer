import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptGuide } from './prompt-guide';

describe('PromptGuide', () => {
  let component: PromptGuide;
  let fixture: ComponentFixture<PromptGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptGuide],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptGuide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
