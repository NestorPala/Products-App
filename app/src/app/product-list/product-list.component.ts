import { Component, isDevMode, OnInit } from '@angular/core';
import { Product } from '../classes/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  API_URL = isDevMode() ? "http://localhost:3000" : window.location.origin
  apiURL = this.API_URL + "/products";

  products: Product[] = [];
  searchResults: Product[] = [];

  productsToShow: Product[] = [];

  constructor() { }

  ngOnInit(): void {
    //...
  }

  ngAfterViewInit() {
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
      if (this.searching() === true) {
        this.doSearch();
        this.productsToShow = this.searchResults;
        console.log("searching");
      } else {
        this.productsToShow = this.products;
        console.log("not searching");
      }
    });
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
          location.reload(); //remove later
      });
    }

    searching(): boolean {
      return localStorage.getItem('searching') === "searching";
    }

    searchTerm(): string | null {
      return localStorage.getItem('search_term');
    }

    doSearch(): void {
      const term = this.searchTerm() ?? '';
      if (term !== '') {
        this.searchResults = this.products.filter(product => {
          return product.name.toLowerCase().includes(term.toLowerCase());
        });
      }
    }

    stopSearch(): void {
      localStorage.setItem('searching', "not searching");
      localStorage.setItem('search_term', '');
    }

    beginSearch(term: string): void {
      localStorage.setItem('searching', "searching");
      localStorage.setItem('search_term', term);
    }

    searchProduct(term: string) {
      console.log("begin search");
      this.beginSearch(term);
      location.reload(); 
    }

    resetSearch() {
      console.log("reset search");
      this.stopSearch();
      location.reload(); 
    }

  }