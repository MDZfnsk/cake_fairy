import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AdminJwtInterceptor, AdminsModule, AdminAuthGuardService } from '@cakefairy/admins';
import { ProductsModule } from "@cakefairy/products";
import { StoresModule } from '@cakefairy/stores';
import { UsersModule } from "@cakefairy/users";
import { OrdersModule} from "@cakefairy/orders";
import { UiModule } from '@cakefairy/ui';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersInfoComponent } from './pages/users-info/users-info.component';
import { UsersComponent } from './pages/users/users.component';
import { StoresComponent } from './pages/stores/stores.component';
import { ProductsComponent } from './pages/products/products.component';


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
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';


import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { NgxStripeModule } from 'ngx-stripe';
import { StoresInfoComponent } from './pages/stores-info/stores-info.component';
import { ProductsInfoComponent } from './pages/products-info/products-info.component';



const routes: Routes = [
  {path: '', canActivate:[AdminAuthGuardService], component: HomePageComponent, children : [
    {path: '', component: DashboardComponent},
    {path: 'adminusers', component: UsersComponent},
    {path: 'users-info/:userId', component: UsersInfoComponent},
    {path: 'adminstores', component: StoresComponent},
    {path: 'stores-info/:storeId', component: StoresInfoComponent},
    {path: 'adminproducts', component: ProductsComponent},
    {path: 'products-info/:productId', component: ProductsInfoComponent}
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
  EditorModule,
  DropdownModule,
  TagModule

];


@NgModule({
  declarations: [
    AppComponent, 
    DashboardComponent, 
    SidebarComponent, 
    HomePageComponent, 
    UsersComponent, 
    StoresComponent, 
    ProductsComponent, 
    UsersInfoComponent, StoresInfoComponent, ProductsInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    UX_MODULE,
    AdminsModule,
    HttpClientModule,
    ProductsModule,
    StoresModule,
    UsersModule,
    UiModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    OrdersModule,
    NgxStripeModule.forRoot('pk_test_51N2rTNCaqVFK5FUV03XBh35ZzwLc4R3reM9GXK7SrknDP3xVgxhRWIvuM6gbJiDIsaLyC5jnQKGy9JzAHnEs2nne00sQCmXg9d'),  
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AdminJwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
