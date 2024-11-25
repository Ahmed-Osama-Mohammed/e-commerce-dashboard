import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyFormatter'
  })
  export class CurrencyFormatterPipe implements PipeTransform {
    transform(value: number, currencySymbol: string = '$', decimalPlaces: number = 2): string {
      return currencySymbol + value.toFixed(decimalPlaces);
    }
  }
  
