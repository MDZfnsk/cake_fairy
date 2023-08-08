import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';



import { UiModule } from '@cakefairy/ui';


import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule} from 'primeng/paginator';
import { CarouselModule } from 'primeng/carousel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
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
import { TableModule } from 'primeng/table';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';





const routes: Routes = [
  { path: 'products', component: ProductsListComponent},
  { path: 'products/text/:searchString', component: ProductsListComponent},
  { path: 'category/:categoryid', component: ProductsListComponent},
  { path: 'products/:productid', component: ProductPageComponent} 
]


const UX_MODULE = [
  CheckboxModule,
  RatingModule,
  InputNumberModule,
  PaginatorModule,
  CarouselModule,
  ProgressSpinnerModule,
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
    CategoriesBannerComponent,
    ProductsListComponent,
    ProductItemComponent,
    ProductPageComponent,
    ProductCarouselComponent,
   
  ],
  exports: [
    CategoriesBannerComponent,
    ProductsListComponent,
    ProductItemComponent,
    ProductPageComponent,
    ProductCarouselComponent,
   
  ],
})
export class ProductsModule {}
