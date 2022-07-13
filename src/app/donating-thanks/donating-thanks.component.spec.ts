import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatingThanksComponent } from './donating-thanks.component';

describe('DonatingThanksComponent', () => {
  let component: DonatingThanksComponent;
  let fixture: ComponentFixture<DonatingThanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonatingThanksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonatingThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
