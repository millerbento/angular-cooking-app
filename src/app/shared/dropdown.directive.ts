import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen; //Always sets to the opposite value
  }

  //Closing dropdown when the user clicks outside of it
  @HostListener('document:click', ['$event']) closeDropdown(event: MouseEvent) {
    const dropdown = event.target as HTMLElement;
    //dropdown-toggle is the item inside a dropdown, in this case we don't want to close it
    if (!dropdown.classList.contains('dropdown-toggle')) { 
      this.isOpen = false;
    } 
  }
}
