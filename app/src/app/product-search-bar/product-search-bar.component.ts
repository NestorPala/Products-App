import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-search-bar',
  templateUrl: './product-search-bar.component.html',
  styleUrls: ['./product-search-bar.component.css']
})
export class ProductSearchBarComponent implements OnInit {

  @Output() searchTermEmitter = new EventEmitter<string>();
  @Output() resetSearchEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  search(input: HTMLInputElement) {
    this.searchTermEmitter.emit(input.value);
    input.value = "";
  }

  resetList() {
    this.resetSearchEmitter.emit();
  }

}
