import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // When the mouse enters the element
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'white'); 
    this.renderer.setStyle(this.el.nativeElement, 'color', 'black'); 
  }

  // When the mouse leaves the element
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'background-color'); 
    this.renderer.removeStyle(this.el.nativeElement, 'color');
  }
}
