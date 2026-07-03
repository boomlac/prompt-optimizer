import { Component, DOCUMENT, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPromptOptimizer implements OnInit {
  private readonly doc = inject(DOCUMENT);

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
      // update canonical for this route
    const canonical = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) canonical.href = 'https://promptoptimizer.boomlac.com/about';
    
    this.title.setTitle('About PromptOptimizer — AI Prompt Analysis & Scoring Tool');
    this.meta.updateTag({ name: 'description', content: 'Learn how PromptOptimizer scores your AI prompts across Clarity, Completeness, Structure, Context, and Risk — and generates step-by-step rewrites to maximize output quality.' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: 'About PromptOptimizer — AI Prompt Analysis & Scoring Tool' });
    this.meta.updateTag({ property: 'og:description', content: 'PromptOptimizer detects weaknesses, scores your prompt across 5 dimensions, and generates actionable improvements.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://promptoptimizer.boomlac.com/screenshots/promptOptimizer_tool.png' });
    this.meta.updateTag({ property: 'og:url', content: 'https://promptoptimizer.boomlac.com/about' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'About PromptOptimizer — AI Prompt Scoring Tool' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Discover how PromptOptimizer analyzes and improves your AI prompts across 5 quality dimensions.' });
  }
}
