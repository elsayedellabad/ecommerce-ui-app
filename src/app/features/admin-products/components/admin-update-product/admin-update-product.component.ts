import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductsService } from '../../services/admin-products.service';

/* eslint-disable */

@Component({
  selector: 'app-admin-update-product',
  templateUrl: './admin-update-product.component.html',
  styleUrls: ['./admin-update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  updateProductForm: any;
  action = 'update';
  saving = false;
  loadingDetails = false;
  constructor(
    private router: Router,
    private adminProductsService: AdminProductsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.setUpdateFormValues();
  }

  initForm() {
    this.updateProductForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  setUpdateFormValues() {
    if (!this.adminProductsService.selectedProduct) {
      this.goToProductsListing();
    }
    this.updateProductForm
      .get('title')
      .setValue(this.adminProductsService?.selectedProduct?.title);
    this.updateProductForm
      .get('price')
      .setValue(this.adminProductsService?.selectedProduct?.price);
    this.updateProductForm
      .get('description')
      .setValue(this.adminProductsService?.selectedProduct?.description);
    this.updateProductForm
      .get('image')
      .setValue(this.adminProductsService?.selectedProduct?.image);
    this.updateProductForm
      .get('category')
      .setValue(this.adminProductsService?.selectedProduct?.category);
  }

  updateProduct() {
    const payload = {
      id: this.adminProductsService?.selectedProduct?.id,
      title: this.updateProductForm.value?.title,
      price: this.updateProductForm.value?.price,
      description: this.updateProductForm.value?.description,
      image: this.updateProductForm.value?.image,
      category: this.updateProductForm.value?.category,
    };

    this.adminProductsService
      .updateProduct(this.adminProductsService?.selectedProduct?.id, payload)
      .subscribe({
        next: (result) => {
          // console.log('@result >> ', result);
          this.goToProductsListing();
        },
        error: (e) => {
          console.log(e.error['message']);
        },
      });
  }

  goToProductsListing() {
    this.router.navigateByUrl('/ecommerce/admin/products');
  }

  back() {
    this.router.navigateByUrl('/ecommerce/admin/products');
  }

  ngOnDestroy(): void {}
}
