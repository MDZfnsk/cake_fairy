import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from "./app.component";
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { UiModule } from '@cakefairy/ui';
import { ProductsModule } from "@cakefairy/products";
import { StoresModule } from '@cakefairy/stores';
import { JwtInterceptor, AuthGuardService, UsersModule } from "@cakefairy/users";
import { OrdersModule} from "@cakefairy/orders";

import { UserProfileComponent } from "libs/users/src/lib/pages/user/user-profile/user-profile.component";
import { UserFormComponent } from "libs/users/src/lib/pages/user/user-form/user-form.component";
import { StoreFormComponent } from "libs/stores/src/lib/pages/store-form/store-form.component";
import { StorePageComponent } from "libs/stores/src/lib/pages/store-page/store-page.component";


import { StoreProductFormComponent } from './pages/store-products/store-product-form/store-product-form.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MyOrdersListComponent } from "libs/orders/src/lib/pages/my-orders-list/my-orders-list.component";
import { MyOrdersDetailsComponent } from "libs/orders/src/lib/pages/my-orders-details/my-orders-details.component";
import { StoreProductsListComponent } from './pages/store-products/store-products-list/store-products-list.component';


import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule} from 'primeng/paginator';
import { CarouselModule } from 'primeng/carousel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { EditorModule } from 'primeng/editor';



import { NgxStripeModule } from 'ngx-stripe';
import { StoreOrdersListComponent } from "libs/orders/src/lib/pages/store-orders-list/store-orders-list.component";
import { StoreOrdersDetailsComponent } from "libs/orders/src/lib/pages/store-orders-details/store-orders-details.component";







const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'user', canActivate:[AuthGuardService], component: UserPageComponent, children: [
    {path: '', component: UserProfileComponent},
    {path: 'form/:id' , component: UserFormComponent},
    {path: 'store/form', component: StoreFormComponent},    
    {path: 'store/:storeId', component: StorePageComponent},
    {path: 'store/products/form' , component: StoreProductFormComponent},    
    {path: 'store/products/:storeId', component: StoreProductsListComponent},
    {path: 'myorders/:id' , component: MyOrdersListComponent},
    {path: 'myorders/details/:orderId' , component: MyOrdersDetailsComponent},
    {path: 'store/orders/:storeId' , component: StoreOrdersListComponent},
    {path: 'store/order/details/:orderId' , component: StoreOrdersDetailsComponent}
    
    
  ]}
 
];


const UX_MODULE = [ 
  ButtonModule,
  MenubarModule,
  CheckboxModule,
  RatingModule,
  InputNumberModule,
  PaginatorModule,
  CarouselModule,
  ProgressSpinnerModule,  
  InputTextModule,
  ToastModule,
  CardModule,
  ToolbarModule,
  FieldsetModule,
  InputMaskModule,
  InputSwitchModule,
  BadgeModule,
  ConfirmDialogModule,
  TableModule,
  EditorModule
];




@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent, 
    HeaderComponent, 
    FooterComponent, 
    UserPageComponent, 
    SidebarComponent, StoreProductFormComponent, StoreProductsListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    ProductsModule,
    UsersModule,
    StoresModule,
    OrdersModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),    
    FontAwesomeModule,
    NgxStripeModule.forRoot('pk_test_51N2rTNCaqVFK5FUV03XBh35ZzwLc4R3reM9GXK7SrknDP3xVgxhRWIvuM6gbJiDIsaLyC5jnQKGy9JzAHnEs2nne00sQCmXg9d'),
    UX_MODULE
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true} 
  ],
  bootstrap: [
    AppComponent],
  exports: [
    StoreProductFormComponent,
    StoreProductsListComponent
  ],
})
export class AppModule {}
