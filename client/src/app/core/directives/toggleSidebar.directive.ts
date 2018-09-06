import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[toggleSidebar]'
})
export class ToggleSidebarDirective {
    elem: HTMLElement;

    constructor(element: ElementRef) {
        this.elem = element.nativeElement;
    }

    @HostListener('click') toggle() {
        let toggleMenu = document.querySelector('.toggleMenu');
        toggleMenu.classList.toggle('translatedX');
        toggleMenu.classList.toggle('toggleMenu--active');

        document.querySelector('#main-sidebar').classList.toggle('is-open');
    }
}