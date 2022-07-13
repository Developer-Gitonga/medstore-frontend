import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingFormComponent } from './shopping-form.component';

describe('ShoppingFormComponent', () => {
  let component: ShoppingFormComponent;
  let fixture: ComponentFixture<ShoppingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
