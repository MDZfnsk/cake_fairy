import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../models/category';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';



@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.scss']
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {


 

  categories;
  endSubs$: Subject<any> = new Subject();

    constructor(
      private categoriesService: CategoriesService
      ) {}

    ngOnInit(): void {        
        this.categoriesService
            .getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe((categories) => {              
               this.categories = categories;
            });
    }




    ngOnDestroy(): void {
        this.endSubs$.next(2);
    }

}
