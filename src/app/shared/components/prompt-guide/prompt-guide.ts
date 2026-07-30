import { Component, signal, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { MatStepperModule } from '@angular/material/stepper';
import { PromptPreview } from '../prompt-preview/prompt-preview';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-prompt-guide',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HeroComponent,
    MatStepperModule,
    PromptPreview
  ],
  templateUrl: './prompt-guide.html',
  styleUrls: ['./prompt-guide.scss'],
})
export class PromptGuide implements OnInit {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  role = '';
  objective = '';
  successCriteria = '';
  context = '';
  inputVariables = '';
  section1 = '';
  section2 = '';
  section3 = '';
  constraints = '';

  // Example arrays (dynamic supplementary text)
  roleExamples = ['Analyst', 'Architect', 'Researcher', 'Content Generator', 'Strategist'];
  goalExamples = ['Generate a structured summary', 'Produce a detailed analysis', 'Create a content outline', 'Explain a concept clearly'];
  contextExamples = ['This content will be used to generate a prompt for an AI writing assistant.'];
  inputExamples = ['Topic', 'Text', 'Constraints', 'Target audience'];
  breakdownExamples = ['Key insights', 'Detailed explanation', 'Actionable steps'];
  constraintExamples = ['Word limits', 'Tone requirements', 'Formatting rules'];

  finalPrompt: string = '';

  ngOnInit() {
    this.titleService.setTitle('Prompt Builder — Create High-Quality AI Prompts with Structure & Clarity');

    this.metaService.updateTag({
      name: 'description',
      content: 'Prompt Builder helps you craft perfect AI prompts using a guided 7-step workflow. Define role, goal, context, inputs, constraints, and output structure — then generate a production-ready prompt instantly.'
    });

    this.metaService.updateTag({
      property: 'og:title',
      content: 'Prompt Builder — Guided AI Prompt Creation Tool'
    });

    this.metaService.updateTag({
      property: 'og:description',
      content: 'Build precise, structured, high-clarity AI prompts using a guided 7-step builder. Free, fast, and no login required.'
    });

    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://promptoptimizer.boomlac.com/prompt-builder'
    });

  }

  generatePrompt() {
    this.finalPrompt = `
## 1. ROLE
Act as: ${this.role}

## 2. GOAL
Primary objective: ${this.objective}
Success criteria: ${this.successCriteria}

## 3. CONTEXT
Relevant background information:
${this.context}

## 4. INPUT
User will provide:
${this.inputVariables}

## 5. OUTPUT REQUIREMENTS
### A. Core Answer
- Direct
- Concise
- No filler

### B. Structured Breakdown
- ${this.section1}
- ${this.section2}
- ${this.section3}

### C. Optional Add-Ons
- Examples
- Variations
- Edge cases
- Implementation steps

## 6. STYLE RULES
- Clear, minimal, and precise
- No theme drift
- No assumptions beyond provided context
- Use structured formatting
- Every sentence must add value

## 7. CONSTRAINTS
Hard constraints:
${this.constraints}

## 8. EXECUTION LOGIC
Always:
- Follow the structure exactly
- Respect constraints strictly
- Ask for missing variables only when essential
- Prioritize correctness over creativity
    `;
  }

  clearAll() {
    this.role = '';
    this.objective = '';
    this.successCriteria = '';
    this.context = '';
    this.inputVariables = '';
    this.section1 = '';
    this.section2 = '';
    this.section3 = '';
    this.constraints = '';
    this.finalPrompt = '';
  }


}
