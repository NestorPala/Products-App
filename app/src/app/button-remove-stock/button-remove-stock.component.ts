import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../classes/Product';

@Component({
  selector: 'app-button-remove-stock',
  templateUrl: './button-remove-stock.component.html',
  styleUrls: ['./button-remove-stock.component.css']
})
export class ButtonRemoveStockComponent implements OnInit {

  @Input() product: Product = {
    _id_ : "0",
    name : "",
    price : 0,
    stock : 0
  };
  @Output() stockRemover = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  removeStock() {
    this.stockRemover.emit(this.product);
  }
}