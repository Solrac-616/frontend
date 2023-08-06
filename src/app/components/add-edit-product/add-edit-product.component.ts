import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  
  constructor(
      private fb: FormBuilder, 
      private _productService: ProductService,
      private router: Router
    ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    });
  }

  addProduct() {
    console.log(this.form.value);
    this.loading = true;
    this._productService.postProduct(this.form.value).subscribe(() => {
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
  }
}
