import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductsListComponent } from './store-products-list.component';

describe('StoreProductsListComponent', () => {
  let component: StoreProductsListComponent;
  let fixture: ComponentFixture<StoreProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
