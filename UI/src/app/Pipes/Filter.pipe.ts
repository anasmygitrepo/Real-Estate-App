import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], Filterstring: string, propName: string) {
    console.log(Filterstring);
    const ValueArraay = [];
    if (value) {
      if (value.length === 0 || Filterstring === '' || propName === '') {
        return value;
      }
      for (const item of value) {
        if (item[propName].toLowerCase() === Filterstring) {
          ValueArraay.push(item);
        }
      }
    }
    return ValueArraay;
  }
}
