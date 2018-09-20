import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MenuMobileComponent } from "./_menu-mobile/_menu-mobile.component";
import { ToggleSidebarDirective } from "../../core/directives/toggleSidebar.directive";
import { MainModule } from "../main.module";
import { DirectivesModule } from "../../core/directives/directives.module";

@NgModule({
    declarations: [
        MenuMobileComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        DirectivesModule
    ],
    exports: [
        MenuMobileComponent,
    ]
})
export class MenuModule { }