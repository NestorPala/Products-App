import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddStockComponent } from './button-add-stock.component';

describe('ButtonAddStockComponent', () => {
  let component: ButtonAddStockComponent;
  let fixture: ComponentFixture<ButtonAddStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAddStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonAddStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
