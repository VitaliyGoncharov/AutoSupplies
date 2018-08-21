import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserService } from "./services/user.service";
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from "@angular/router";
import { AuthGuard } from "./auth.guard";
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ManagerModule } from './manager/manager.module';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    UserComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    ProfileComponent,
    CatalogComponent,
    CartComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ManagerModule
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
