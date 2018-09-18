import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MenuMobileComponent } from "./_menu-mobile/_menu-mobile.component";

@NgModule({
    declarations: [
        MenuMobileComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        MenuMobileComponent
    ]
})
export class MenuModule { }