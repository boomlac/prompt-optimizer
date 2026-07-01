import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitalPrompt } from './inital-prompt';

describe('InitalPrompt', () => {
  let component: InitalPrompt;
  let fixture: ComponentFixture<InitalPrompt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitalPrompt],
    }).compileComponents();

    fixture = TestBed.createComponent(InitalPrompt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
