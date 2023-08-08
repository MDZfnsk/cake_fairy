import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductFormComponent } from './store-product-form.component';

describe('StoreProductFormComponent', () => {
  let component: StoreProductFormComponent;
  let fixture: ComponentFixture<StoreProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
