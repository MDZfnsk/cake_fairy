import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockStorePageComponent } from './block-store-page.component';

describe('BlockStorePageComponent', () => {
  let component: BlockStorePageComponent;
  let fixture: ComponentFixture<BlockStorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockStorePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockStorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
