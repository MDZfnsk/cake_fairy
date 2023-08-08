import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuardService } from '@cakefairy/users';
import { UiModule } from '@cakefairy/ui';

import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { MyOrdersListComponent } from './pages/my-orders-list/my-orders-list.component';


import { BadgeModule } from 'primeng/badge';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule} from 'primeng/paginator';
import { MenubarModule } from 'primeng/menubar';
import { CarouselModule } from 'primeng/carousel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';


import { MyOrdersDetailsComponent } from './pages/my-orders-details/my-orders-details.component';
import { OrderIconComponent } from './components/order-icon/order-icon.component';
import { StoreOrdersListComponent } from './pages/store-orders-list/store-orders-list.component';
import { StoreOrdersDetailsComponent } from './pages/store-orders-details/store-orders-details.component';




const routes: Routes = [
  {path: 'cart', component: CartPageComponent}, 
  {path: 'checkout', canActivate:[AuthGuardService], component: CheckoutPageComponent},
  {path: 'success', component: ThankYouComponent}
 
]


const UX_MODULE = [ 
  BadgeModule,
  ButtonModule,
  MenubarModule,
  CheckboxModule,
  RatingModule,
  InputNumberModule,
  DropdownModule,
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
  ConfirmDialogModule,
  TableModule,
  EditorModule,
  TagModule,
 
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes), 
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    UX_MODULE
  ],
  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
    MyOrdersListComponent,
    MyOrdersDetailsComponent,
    OrderIconComponent,
    StoreOrdersListComponent,
    StoreOrdersDetailsComponent
  ],
  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
    MyOrdersListComponent,
    MyOrdersDetailsComponent,
    OrderIconComponent,
    StoreOrdersListComponent,
    StoreOrdersDetailsComponent
  ],
})
export class OrdersModule {}
