import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrdersDetailsComponent } from './store-orders-details.component';

describe('StoreOrdersDetailsComponent', () => {
  let component: StoreOrdersDetailsComponent;
  let fixture: ComponentFixture<StoreOrdersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrdersDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
