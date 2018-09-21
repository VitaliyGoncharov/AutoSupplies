import { Injectable, Directive, ElementRef, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[toggleDropdown]'
})
export class ToggleDropdownDirective {

    elem: ElementRef;

    private MAIN_DROPDOWN_CONTENT = ".main-dropdown-content";
    private VISIBLE = "d-block";

    constructor(element: ElementRef) {
        this.elem = element.nativeElement;
    }

    @HostListener('mouseover') onmouseover() {
        let dropDownContent = document.querySelector(this.MAIN_DROPDOWN_CONTENT);
        if (!dropDownContent.classList.contains(this.VISIBLE)) {
            dropDownContent.classList.add(this.VISIBLE);
        }
    }

    @HostListener('mouseout') onmouseout() {
        document.querySelector(this.MAIN_DROPDOWN_CONTENT).classList.remove(this.VISIBLE);
    }

    @HostListener('click') toggle() {
        document.querySelector(this.MAIN_DROPDOWN_CONTENT).classList.toggle(this.VISIBLE);
    }
}