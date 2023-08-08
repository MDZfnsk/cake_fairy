import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { StorePageComponent } from './pages/store-page/store-page.component';
import { StoreFormComponent } from './pages/store-form/store-form.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';

import { UiModule } from '@cakefairy/ui';


import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { ReviewFormComponent } from './pages/review-form/review-form.component';


const routes: Routes = [  
  { path: 'ratings/:storeId' , component: ReviewPageComponent},
  { path: 'form/ratings/:orderId' , component: ReviewFormComponent}
]




const UX_MODULE = [
  ButtonModule,
  InputTextModule,
  ToastModule,
  CardModule,
  ToolbarModule,
  FieldsetModule,
  InputMaskModule,
  InputSwitchModule,
  BadgeModule,
  ConfirmDialogModule,
  RatingModule
  
];

@NgModule({
  imports: [
    CommonModule,    
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    UX_MODULE,
    UiModule
  ],
  declarations: [
    StoreFormComponent,
    StorePageComponent,
    ReviewPageComponent,
    ReviewFormComponent
  ],
  exports: [
    StoreFormComponent,
    StorePageComponent,
    ReviewPageComponent,
    ReviewFormComponent
  ]
})
export class StoresModule {}
