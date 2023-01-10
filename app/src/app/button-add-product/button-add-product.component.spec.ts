import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddProductComponent } from './button-add-product.component';

describe('ButtonAddProductComponent', () => {
  let component: ButtonAddProductComponent;
  let fixture: ComponentFixture<ButtonAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAddProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
