import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrdersListComponent } from './store-orders-list.component';

describe('StoreOrdersListComponent', () => {
  let component: StoreOrdersListComponent;
  let fixture: ComponentFixture<StoreOrdersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrdersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreOrdersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
