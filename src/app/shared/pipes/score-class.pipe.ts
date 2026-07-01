import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreClass'
})
export class ScoreClassPipe implements PipeTransform {

  transform(score: number | null): string {
    if (score === null) return 'score-no';
    if (score >= 90) return 'score-excellent';
    if (score >= 70) return 'score-good';
    if (score >= 40) return 'score-weak';
    return 'score-poor';
  }
}
