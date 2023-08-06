import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})

export class ListProductsComponent {
  lisProducts: Product[] = [
    
  ]

  constructor(private _productService: ProductService){

  }

  ngOnInit(){
    this.getListProducts();
  }

  getListProducts()
  {
    this._productService.getProducts().subscribe((data) => {
      this.lisProducts = data;
    })
  }
}