import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../classes/Product';

@Component({
  selector: 'app-button-delete-product',
  templateUrl: './button-delete-product.component.html',
  styleUrls: ['./button-delete-product.component.css']
})
export class ButtonDeleteProductComponent implements OnInit {

  @Input() product: Product = {
    _id_ : "0",
    name : "",
    price : 0,
    stock : 0
  };
  @Output() productDeleter = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }
  
  deleteProduct() {
    this.productDeleter.emit(this.product);
  }
}