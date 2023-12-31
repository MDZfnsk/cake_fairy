import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  
  selectedImageUrl: string;

  @Input() images: string[];


  ngOnInit(): void {
      if(this.hasImages){
        this.selectedImageUrl = this.images[0];
      }       
  }


  changeSelectedImage(image: string){
    this.selectedImageUrl = image;
  }


  //Checking if the images array is empty or not
  get hasImages() {
    return this.images?.length > 0;
  }

}
