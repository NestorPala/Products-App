import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-remove-stock',
  templateUrl: './button-remove-stock.component.html',
  styleUrls: ['./button-remove-stock.component.css']
})
export class ButtonRemoveStockComponent implements OnInit {

  @Input() product_id: string = "";

  apiURL = "http://localhost:3000/products";

  constructor() { }

  ngOnInit(): void {
  }

  removeStock() {
    let stockToRemove = prompt("Enter amount of items for removing from stock:");

    fetch(this.apiURL + `/${this.product_id}/removestock`, {
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
    });
  }
}
