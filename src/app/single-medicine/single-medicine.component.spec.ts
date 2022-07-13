import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMedicineComponent } from './single-medicine.component';

describe('SingleMedicineComponent', () => {
  let component: SingleMedicineComponent;
  let fixture: ComponentFixture<SingleMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMedicineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
