import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-add-stock',
  templateUrl: './button-add-stock.component.html',
  styleUrls: ['./button-add-stock.component.css']
})
export class ButtonAddStockComponent implements OnInit {

  @Input() product_id: string = "";

  apiURL = "http://localhost:3000/products";

  constructor() { }

  ngOnInit(): void {
  }

  addStock() {
    let stockToAdd = prompt("Enter amount of items for adding to stock:");

    fetch(this.apiURL + `/${this.product_id}/addstock`, { //hardcoded id
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
    });
  }

}
