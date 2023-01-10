import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDeleteProductComponent } from './button-delete-product.component';

describe('ButtonDeleteProductComponent', () => {
  let component: ButtonDeleteProductComponent;
  let fixture: ComponentFixture<ButtonDeleteProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonDeleteProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDeleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
