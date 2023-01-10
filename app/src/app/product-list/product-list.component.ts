import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  apiURL = "http://localhost:3000/products";

  products: Product[] = [];

  constructor() { }

  ngOnInit(): void {
    fetch(this.apiURL)
    .then(response => response.json())
    .then(products => {
      for (let product of products) {
        this.products.push({
          _id_: product._id,
          name: product.name,
          price: product.price,
          stock: product.stock
        });
      }
    });
  }
}
