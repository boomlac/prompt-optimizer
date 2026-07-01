import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'scoreLabel'
})
export class ScoreLabelPipe implements PipeTransform {

  transform(score: number | null): string {
    if (score === null) return 'No Score';
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 40) return 'Weak';
    if (score >= 0) return 'Poor';
    return 'No Score';
  }
}
