import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBlurOnScroll]'
})
export class BlurOnScrollDirective {
  @HostBinding('class.blur-bg') isBlurred = false;

  @HostListener('window:scroll', ['$event'])
  
  onWindowScroll(event: Event) {
    const scrollHeight = window.scrollY;
    this.isBlurred = scrollHeight > 20;
  }
}