import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'targetblank a',
})
export class TargetBlankDirective {
  @HostBinding('attr.target') target = '_blank';
}