import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ManagerModule } from "../views/manager/manager.module";
import { UserModule } from "../views/user/user.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { CartComponent } from "../views/cart/cart.component";
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
import { AuthInterceptor } from "../core/interceptors/auth.interceptor";
import { OrdersResolver } from "../core/resolvers/orders.resolver";
import { OrderResolver } from "../core/resolvers/order.resolver";
import { UserResolver } from "../core/resolvers/user.resolver";
import { ItemsResolver } from "../core/resolvers/items.resolver";
import { ItemsCartResolver } from "../core/resolvers/items-cart.resolver";
import { SearchComponent } from "../views/search/search.component";
import { MenuModule } from "./_menu/menu.module";
import { CatalogsListComponent } from "../views/catalogs-list/catalogs-list.component";
import { CatalogsResolver } from "../core/resolvers/catalogs.resolver";
import { DirectivesModule } from "../core/directives/directives.module";
import { CatalogListModule } from "../views/catalogs-list/catalog-list.module";
import { CatalogItemsComponent } from "../views/catalog-items/catalog-items.component";
import { GetObjectValuesPipe } from "../core/pipes/get-object-values";
import { SpecialDealsModule } from "../views/special-deals/special-deals.module";
import { ShopsListComponent } from "../views/shops-list/shops-list.component";
import { CompanyInfoComponent } from "../views/company-info/company-info.component";

@NgModule({
    declarations: [
        GetObjectValuesPipe,
        PageNotFoundComponent,
        MainComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        HomeComponent,
        CatalogItemsComponent,
        CartComponent,
        SearchComponent,
        ShopsListComponent,
        CompanyInfoComponent
    ],
    imports: [
        MenuModule,
        DirectivesModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MainRouterModule,
        UserModule,
        ManagerModule,
        CatalogListModule,
        SpecialDealsModule
    ],
    providers: [
        OrdersResolver,
        OrderResolver,
        UserResolver,
        ItemsResolver,
        ItemsCartResolver,
        CatalogsResolver,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    exports: []
})
export class MainModule { }