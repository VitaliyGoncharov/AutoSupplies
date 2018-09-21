import { NgModule } from "@angular/core";
import { SpecialDealsComponent } from "./special-deals.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        SpecialDealsComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        SpecialDealsComponent
    ]
})
export class SpecialDealsModule { }