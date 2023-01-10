import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRemoveStockComponent } from './button-remove-stock.component';

describe('ButtonRemoveStockComponent', () => {
  let component: ButtonRemoveStockComponent;
  let fixture: ComponentFixture<ButtonRemoveStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonRemoveStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonRemoveStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
