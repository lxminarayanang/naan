import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[decimalNumbersOnly]'
})
export class DecimalNumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    
    const initalValue = this._el.nativeElement.value;

    this._el.nativeElement.value = removeInvalidFloatPoints(initalValue.replace(/[^0-9.]*/g,''));

    if(initalValue !== this._el.nativeElement.value) {
        event.stopPropagation();
    }
    
    function removeInvalidFloatPoints(str: string) {
      return str.replace( /^([^.]*\.)(.*)$/, function ( a, b, c ) { 
        return b + c.replace( /\./g, '' );
    });
    }
  }

}
