import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() _id_ = "0";
  @Input() name = "";
  @Input() price = 0;
  @Input() stock = 0;


  ngOnInit(): void {
  }

}
