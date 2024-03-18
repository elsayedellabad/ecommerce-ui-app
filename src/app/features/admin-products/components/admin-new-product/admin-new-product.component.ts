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
  selector: 'app-admin-new-product',
  templateUrl: './admin-new-product.component.html',
  styleUrls: ['./admin-new-product.component.scss'],
})
export class NewProductComponent implements OnInit, OnDestroy {
  newProductForm: any;
  action = 'add';
  saving = false;
  loadingDetails = false;
  constructor(
    private router: Router,
    private adminProductsService: AdminProductsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newProductForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  saveNewProduct() {
    const payload = {
      title: this.newProductForm.value?.title,
      price: this.newProductForm.value?.price,
      description: this.newProductForm.value?.description,
      image: this.newProductForm.value?.image,
      category: this.newProductForm.value?.category,
    };

    this.adminProductsService.saveNewProduct(payload).subscribe({
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
