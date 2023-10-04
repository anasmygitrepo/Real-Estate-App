import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: Array<string>, args: any[]): any {
    const Sortfield = args[0];
    const SortOrder = args[1];
    let multiplier = 1;
    if (SortOrder === 'desc') {
      multiplier = -1;
    }
    if (value) {
      value.sort((a: any, b: any) => {
        if (a[Sortfield] < b[Sortfield]) {
          return -1 * multiplier;
        } else if (a[Sortfield] > b[Sortfield]) {
          return 1 * multiplier;
        } else {
          return 0;
        }
      });
    }
    return value;
  }
}
