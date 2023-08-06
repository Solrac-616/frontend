import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})

export class ListProductsComponent {
  lisProducts: Product[] = []
  loading: boolean = false;

  constructor(private _productService: ProductService){

  }

  ngOnInit(){
    this.getListProducts();
  }

  getListProducts()
  {
    this.loading = true;

    // TIME OUT PARA VISUALIZAR LA BARRA DE CARGA
    setTimeout(() => {
      this._productService.getProducts().subscribe((data) => {
        this.lisProducts = data;
        this.loading = false;
      })
    }, 1500);
  }

  deleteProduct(id: number)
  {
    this.loading = true;

    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then(result => {
      if (result.isConfirmed) {
        this._productService.deleteProducts(id).subscribe(() => {
          this.getListProducts();
          Swal.fire("Deleted", "the products has been deleted", "info");
        })
      }else{
        this.getListProducts();
      }
    });
  }
}