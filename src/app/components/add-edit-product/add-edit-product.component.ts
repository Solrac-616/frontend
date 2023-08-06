import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  mode: string = 'Add '
  
  constructor(
      private fb: FormBuilder, 
      private _productService: ProductService,
      private router: Router,
      private paramRoute: ActivatedRoute
    ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    });
    this.id = Number(paramRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.mode = 'Edit '
      this.getProduct(this.id)
    }
  }

  getProduct(id: number){
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) =>{
      console.log('============PRODUCTO================');
      console.log(data);
      console.log('====================================');
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      })
      this.loading = false;
    })
  }

  addProduct() {
    //console.log(this.form.value);
    const product = this.form.value;
    this.loading = true;

    if (this.id == 0) {
      this._productService.postProduct(product).subscribe(() => {
        this.loading = false;
  
        Swal.fire({
          title: "Success",
          text: "The product has been created successfully",
          icon: "success",
          confirmButtonText: 'Continue'
        }).then(result => {
          if (result) {
            this.router.navigate(['/'])
          }else{
            this.router.navigate(['/'])
          }
        });
      })
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to update this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Continue'
      }).then(result => {
        if (result.isConfirmed) {
          product.id = this.id;
          this._productService.updateProduct(this.id, product).subscribe(() => {
            this.loading = false;
            Swal.fire({
              title: "Success",
              text: "The product has been update successfully",
              icon: "success",
              confirmButtonText: 'Continue'
            }).then(result => {
              if (result) {
                this.router.navigate(['/'])
              }
            });
          })
        }else{
          this.loading = false;
        }
      });
    }

    
  }
}
