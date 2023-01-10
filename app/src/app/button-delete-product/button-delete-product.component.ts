import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-delete-product',
  templateUrl: './button-delete-product.component.html',
  styleUrls: ['./button-delete-product.component.css']
})
export class ButtonDeleteProductComponent implements OnInit {

  apiURL = "http://localhost:3000/products";

  @Input() product_id: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  removeProduct() {
    fetch(this.apiURL + `/${this.product_id}`, {method: "DELETE"}) //hardcoded id
      .then(res => res.json())
      .then(json => {
          alert(json.message);
      });
  }
}
