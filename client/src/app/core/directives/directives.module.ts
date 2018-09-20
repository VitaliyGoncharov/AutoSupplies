import { NgModule } from "@angular/core";
import { ToggleSidebarDirective } from "./toggleSidebar.directive";
import { ToggleDropdownDirective } from "./toggleDropdown.directive";

@NgModule({
    declarations: [
        ToggleSidebarDirective,
        ToggleDropdownDirective
    ],
    exports: [
        ToggleSidebarDirective,
        ToggleDropdownDirective
    ]
})
export class DirectivesModule { }