import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './views/home/home.component';
import { CatalogComponent } from './views/catalog/catalog.component';
import { CartComponent } from './views/cart/cart.component';
import { OrderComponent } from './views/order/order.component';
import { UserModule } from './views/user/user.module';
import { ManagerModule } from './views/manager/manager.module';
import { UserService } from './core/services/user.service';
import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    CatalogComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    UserModule,
    ManagerModule
  ],
  providers: [UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
