import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './custom-directives/highlight.directive';
import { CurrencyFormatterPipe } from './custom-pipes/currency-formatter.pipe';



@NgModule({
  declarations: [HighlightDirective,CurrencyFormatterPipe],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    CurrencyFormatterPipe
  ]
})
export class SharedModule { }
