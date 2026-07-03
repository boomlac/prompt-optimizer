import { Component, DOCUMENT, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  imports: [RouterLink],
  templateUrl: './privacy-policy.html',
  styleUrls: ['./privacy-policy.scss'],
})
export class PrivacyPolicyComponent implements OnInit {
  private readonly doc = inject(DOCUMENT);
  readonly lastUpdated = 'July 2, 2026';

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    const canonical = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonical) canonical.href = 'https://promptoptimizer.boomlac.com/privacy-policy';

    this.title.setTitle('Privacy Policy — PromptOptimizer by boomlac.com');
    this.meta.updateTag({ name: 'description', content: 'PromptOptimizer does not collect, store, or share any personal data. Read our full privacy policy to understand how your prompts are handled.' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: 'Privacy Policy — PromptOptimizer' });
    this.meta.updateTag({ property: 'og:description', content: 'PromptOptimizer does not collect, store, or share any personal data. Your prompts are analyzed and immediately discarded.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://promptoptimizer.boomlac.com/privacy-policy' });
  }
}
