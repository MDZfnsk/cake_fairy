import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresInfoComponent } from './stores-info.component';

describe('StoresInfoComponent', () => {
  let component: StoresInfoComponent;
  let fixture: ComponentFixture<StoresInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoresInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
