import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[toggleSidebar]'
})
export class ToggleSidebarDirective {
    elem: HTMLElement;

    private TOGGLE_MENU = ".toggleMenu";
    private TOGGLE_MENU_IS_ACTIVE = "toggleMenu--active";

    private CONTENT = ".content";
    private OPACITY = "opacity";

    private SIDEBAR = "#main-sidebar";
    private SIDEBAR_IS_VISIBLE = "is-open";

    constructor(element: ElementRef) {
        this.elem = element.nativeElement;
    }

    @HostListener('click') toggle() {
        let toggleMenu = document.querySelector(this.TOGGLE_MENU);
        toggleMenu.classList.toggle(this.TOGGLE_MENU_IS_ACTIVE);

        document.querySelector(this.SIDEBAR).classList.toggle(this.SIDEBAR_IS_VISIBLE);
        document.querySelector(this.CONTENT).classList.toggle(this.OPACITY);
    }
}