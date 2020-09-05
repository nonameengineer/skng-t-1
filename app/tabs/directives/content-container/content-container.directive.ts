import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[contentContainer]'
})
export class ContentContainerDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }
}
