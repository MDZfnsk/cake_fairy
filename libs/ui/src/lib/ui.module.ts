import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { BlockPageComponent } from './components/block-page/block-page.component';
import { BlockStorePageComponent } from './components/block-store-page/block-store-page.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BannerComponent,
    GalleryComponent,
    BlockPageComponent,
    BlockStorePageComponent
  ],
  exports: [
    BannerComponent,
    GalleryComponent,
    BlockPageComponent,
    BlockStorePageComponent,
    
  ],
})
export class UiModule {}
