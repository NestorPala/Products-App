import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../classes/Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  apiURL = location.origin + "/products";

  @Input() product: Product = {
    _id_ : "0",
    name : "",
    price : 0,
    stock : 0
  };

  ngOnInit(): void {
  }

  deleteProduct() {
    fetch(this.apiURL + `/${this.product._id_}`, {method: "DELETE"}) //hardcoded id
    .then(res => res.json())
    .then(json => {
      alert(json.message);
      location.reload(); //remove later
    });
  }

  addStock() {
    let stockToAdd = prompt("Enter amount of items for adding to stock:");

    fetch(this.apiURL + `/${this.product._id_}/addstock`, {
      method: "PATCH",
      headers : {
          'Content-Type': 'application/json'
      },
      body : JSON.stringify({
          incomingStock: stockToAdd,
      }),
    })
    .then(res => res.json())
    .then(json => {
      alert(json.message);
      location.reload(); //remove later
    });
  }

  removeStock() {
    let stockToRemove = prompt("Enter amount of items for removing from stock:");

    fetch(this.apiURL + `/${this.product._id_}/removestock`, {
      method: "PATCH",
      headers : {
          'Content-Type': 'application/json'
      },
      body : JSON.stringify({
          outgoingStock: stockToRemove,
      }),
    })
    .then(res => res.json())
    .then(json => {
      alert(json.message);
      location.reload(); //remove later
    });
  }

}
