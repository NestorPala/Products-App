import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ButtonAddProductComponent } from './button-add-product/button-add-product.component';
import { ButtonDeleteProductComponent } from './button-delete-product/button-delete-product.component';
import { ButtonAddStockComponent } from './button-add-stock/button-add-stock.component';
import { ButtonRemoveStockComponent } from './button-remove-stock/button-remove-stock.component';
import { ProductSearchBarComponent } from './product-search-bar/product-search-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
    ButtonAddProductComponent,
    ButtonDeleteProductComponent,
    ButtonAddStockComponent,
    ButtonRemoveStockComponent,
    ProductSearchBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
