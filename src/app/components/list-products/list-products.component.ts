import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})


export class ListProductsComponent {
  lisProducts: Product[] = [
    {id: 1, name: 'Mouse', description: 'Mouse Led', price: 4, stock: 300},
    {id: 2, name: 'Galaxy30', description: 'Telefono samsung', price: 500, stock: 1200}
  ]
}