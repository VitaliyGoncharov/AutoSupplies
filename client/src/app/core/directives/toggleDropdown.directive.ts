import { Injectable, Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[toggleDropdown]'
})
export class ToggleDropdownDirective {

    elem: ElementRef;

    constructor(element: ElementRef) {
        this.elem = element.nativeElement;
    }

    @HostListener('click') toggle() {
        document.querySelector('.main-dropdown-content').classList.toggle('d-block');
    }
}