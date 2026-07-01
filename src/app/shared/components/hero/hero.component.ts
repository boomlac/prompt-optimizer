import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  subtexts = [
    "Turn rough prompts into precision‑grade instructions",
    "Boost clarity, structure, and output quality instantly",
    "AI‑native optimization for creators, devs, and founders",
    "Your prompt → optimized, enriched, production‑ready"
  ];

  currentSubtext = this.subtexts[0];
  index = 0;

  constructor() {
    setInterval(() => {
      this.index = (this.index + 1) % this.subtexts.length;
      this.currentSubtext = this.subtexts[this.index];
    }, 2500);
  }
}
