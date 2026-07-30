import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptPreview } from './prompt-preview';

describe('PromptPreview', () => {
  let component: PromptPreview;
  let fixture: ComponentFixture<PromptPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
