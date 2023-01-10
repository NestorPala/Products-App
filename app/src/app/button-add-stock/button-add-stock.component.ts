import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../classes/Product';

@Component({
  selector: 'app-button-add-stock',
  templateUrl: './button-add-stock.component.html',
  styleUrls: ['./button-add-stock.component.css']
})
export class ButtonAddStockComponent implements OnInit {

  @Input() product: Product = {
    _id_ : "0",
    name : "",
    price : 0,
    stock : 0
  };
  @Output() stockAdder = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  addStock() {
    this.stockAdder.emit(this.product);
  }
}