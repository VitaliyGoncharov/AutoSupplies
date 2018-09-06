import { NgModule } from "@angular/core";
import { ManagerModule } from "../views/manager/manager.module";
import { UserModule } from "../views/user/user.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { CartComponent } from "../views/cart/cart.component";
import { CatalogComponent } from "../views/catalog/catalog.component";
import { HomeComponent } from "../views/home/home.component";
import { HeaderComponent } from "./_header/_header.component";
import { FooterComponent } from "./_footer/_footer.component";
import { SidebarComponent } from "./_sidebar/_sidebar.component";
import { MainRouterModule } from "./main-router.module";
import { AuthGuard } from "../core/guards/auth.guard";
import { MainComponent } from "./main.component";
import { ToggleSidebarDirective } from "../core/directives/toggleSidebar.directive";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ToggleDropdownDirective } from "../core/directives/toggleDropdown.directive";

@NgModule({
    declarations: [
        ToggleSidebarDirective,
        ToggleDropdownDirective,
        PageNotFoundComponent,
        MainComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        HomeComponent,
        CatalogComponent,
        CartComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MainRouterModule,
        UserModule,
        ManagerModule
    ],
    providers: []
})
export class MainModule { }