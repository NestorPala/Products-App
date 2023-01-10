import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-add-product',
  templateUrl: './button-add-product.component.html',
  styleUrls: ['./button-add-product.component.css']
})
export class ButtonAddProductComponent implements OnInit {

  apiURL = "http://localhost:3000/products";

  constructor() { }

  ngOnInit(): void {
  }

  addProduct() {
    let newProduct = {
        name: (document.getElementById("product-name")! as HTMLInputElement).value,
        price: (document.getElementById("product-price")! as HTMLInputElement).value,
    };

    let data = {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(newProduct),
    }

    let response = fetch(this.apiURL, data);

    response
      .then(res => res.json())
      .then(json => {
          alert(json.message);
      });
  }
}
