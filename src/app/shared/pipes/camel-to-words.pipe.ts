import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToWords'
})
export class CamelToWordsPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) return '';

    // Insert space before capital letters
    const spaced = value.replace(/([A-Z])/g, ' $1');

    // Capitalize first letter
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  }
}
