import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-add-product',
  templateUrl: './button-add-product.component.html',
  styleUrls: ['./button-add-product.component.css']
})
export class ButtonAddProductComponent implements OnInit {

  @Output() productAdder = new EventEmitter<"">();

  constructor() { }

  ngOnInit(): void {
  }

  addProduct() {
    this.productAdder.emit("");
  }
}
