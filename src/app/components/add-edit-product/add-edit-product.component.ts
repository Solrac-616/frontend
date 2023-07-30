import { Component } from '@angular/core';

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  form: FormGroup;
  
  constructor() {
    this.form = new FormGroup({});
  }
}
